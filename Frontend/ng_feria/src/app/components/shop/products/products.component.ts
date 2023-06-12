import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  idProduct!: string;

  constructor(private productService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.obtenerProductos().subscribe(
      (data) => {
        this.products = data;
        localStorage.setItem('products', JSON.stringify(this.products));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //agregar al carrito
  addCart(): void {
    console.log('Agregando al carrito con el siguiente ID de articulo: ' +this.idProduct);
    this.cartService.addArticleToCart(parseInt(this.idProduct), //le paso el id del producto
    )
  }
}
