import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
declare const Swal: any;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutCardComponent } from '../checkout-card/checkout-card.component';


/* import { Product } from 'src/app/Interfaces/product.interface'; */


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
  isLoggedIn: boolean = false;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private cartService: CartService,
    private modalService: NgbModal
  ) {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

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
    const idCart = parseInt(localStorage.getItem('cartId') || '0');
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
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', JSON.stringify(data));

        /* abrir el checkout-card con la confirmacion de la compra */
        this.cartService.getCart(idCart).subscribe((cartData) => {
          const items = cartData.products;
          const amount = parseInt(cartData.amount);
          this.cartService.removeLocalStorageCart();
          this.openModal(items, amount);
        });

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

  delItem(id: number) {
    const idCart = parseInt(localStorage.getItem('cartId') || '0');
    this.cartService.delItemCart(idCart, id).subscribe(
      (data) => {
        if (data.message === 'Producto eliminado del carrito correctamente.') {
          this.cartService.updateLocalStorageCart();
          Swal.fire({ //muestro un mensaje de error
            title: 'Lamentablemente no te llevas este producto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload(); // refrescar la página
          });
          console.log(data.message);
        } else {
          console.error('Error al eliminar el producto:', data.message);
        }
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }



  openModal(items: any, amount:any):void{

    const modalRef= this.modalService.open(CheckoutCardComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount+amount*0.21;
  }

}


