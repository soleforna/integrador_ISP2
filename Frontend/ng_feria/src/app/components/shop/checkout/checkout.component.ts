import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']

}
)
export class CheckoutComponent implements OnInit{
  iva: number = 0;
  monto: number = 0;
  cart: any[] = [];
  products: any[] = [];
  public payPalConfig?: IPayPalConfig;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.initConfig();
    const idCart = parseInt(localStorage.getItem('cartId') || '0');
    this.cartService.getCart(idCart).subscribe(
      (data) => {
        this.cart = data;
        this.products = data.products;
        this.monto = parseInt(data.amount);
        this.iva = parseInt(data.amount) * 0.21;
      });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AZUX7uAdkRgGvnX67Uqou1oZW1FhEnCsFtzJKBIrywdP5DZDB0VHaRDpoEpghSFTAFsiNPoLGEBuOE1W',

      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: (this.monto + this.iva).toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: (this.monto + this.iva).toString(),
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: (this.monto + this.iva).toString(),
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data: any, actions: any) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },

      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }

}


