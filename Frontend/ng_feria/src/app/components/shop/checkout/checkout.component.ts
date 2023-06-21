import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']

}
)
export class CheckoutComponent {
    iva: number= 0;
    monto: number = 0;
    cart: any[] = [];
    products: any[] = [];



  constructor(
    private cartService: CartService
    ) {}

  ngOnInit(): void {
    const idCart = parseInt(localStorage.getItem('cartId') || '0');
    this.cartService.getCart(idCart).subscribe(
      (data) => {
        this.cart = data;
        this.products = data.products;
        this.monto = parseInt(data.amount);
        this.iva = parseInt(data.amount) * 0.21;
        console.log(data);
      });


  }



  // comprarProducts(){
  //   if(this.products.length === 0){
  //    window.location.replace("/products");

  //   }
  //   else{
  //     window.location.replace("/checkout-card");
  //   }
  // }
}


