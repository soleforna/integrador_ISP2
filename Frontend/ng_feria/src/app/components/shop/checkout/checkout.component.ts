import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Product } from 'src/app/Interfaces/product.interface';


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

    let listaItems: any[]= this.getItems(this.products)
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
          items:listaItems
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
        /* JSON.stringify(data)  */

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

  getItems( products: any[]): any[] {
    const items: any[] = [];
    /* Convierto cada item del carrito en un item de paypal */
    products.forEach((product: any) => {
      console.log(product.price);
      const item = {
        name: product.name,
        quantity: "1" ,
        category:"feriaOnline",
        unit_amount: {
          currency_code: 'USD',
          value: (parseInt(product.price) + parseInt( product.price) * 0.21).toString(),
        },
      };

      items.push(item);
    });
   
    return items
  }

}


