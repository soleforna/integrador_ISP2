
import {
  Component,
  OnInit
} from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']

}
)
export class CheckoutComponent implements OnInit {
     iva=21;
     descuento=200;

     public payPalConfig ? : IPayPalConfig;

     ngOnInit(): void {
         this.initConfig();
     }

     private initConfig(): void {
      this.payPalConfig = {
          currency: 'EUR',
          clientId: 'AZUX7uAdkRgGvnX67Uqou1oZW1FhEnCsFtzJKBIrywdP5DZDB0VHaRDpoEpghSFTAFsiNPoLGEBuOE1W',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'EUR',
                      value: '9.99',
                      breakdown: {
                          item_total: {
                              currency_code: 'EUR',
                              value: '9.99'
                          }
                      }
                  },
                  items: [{
                      name: 'Enterprise Subscription',
                      quantity: '1',
                      category: 'DIGITAL_GOODS',
                      unit_amount: {
                          currency_code: 'EUR',
                          value: '9.99',
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


     products = [
    {
      imagen:"../../../../assets/img/remerahombre.jpg",
      codigo:"00254",
      nombre:"Remera Hombre",
      precio:500
    },
    {
      imagen:"../../../../assets/img/zapatoshombre.jpg",
      codigo:"00452",
      nombre:"Zapatos Hombre",
      precio:800
    },
    {
      imagen:"../../../../assets/img/camisahombre.jpg",
      codigo:"00203",
      nombre:"Camisa Hombre",
      precio:600
    }
  ];
  Calculo(): number {
    let montoProducts = 0;

    for (let product of this.products) {
      montoProducts += product.precio;

    }

    return montoProducts;
  }
  CalculoFinal() {
    let IVA = 0;
    let montoFinal = 0;
    IVA = (this.Calculo() * this.iva) /100;
    if(this.Calculo()>0){

    montoFinal = this.Calculo() + IVA - this.descuento;
  }
  else{
    montoFinal = 0;
  }

    return montoFinal;
  }


  comprarProducts(){
    if(this.products.length === 0){
     window.location.replace("/products");

    }
    else{
      window.location.replace("/checkout-card");
    }
  }
}


