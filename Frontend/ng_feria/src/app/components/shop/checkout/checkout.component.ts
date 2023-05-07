import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']

}
)
export class CheckoutComponent {
     iva=21;
     descuento=200;

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


