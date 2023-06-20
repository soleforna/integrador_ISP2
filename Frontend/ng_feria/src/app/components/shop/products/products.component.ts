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

    //metodo para agregar al carrito
  addCart(productId: string): void {
    console.log('Agregando al carrito con el siguiente ID de articulo: ' + productId);
    this.cartService.addArticleToCart( //llamo al servicio para agregar al carrito
      parseInt(productId) //le paso el id del producto
    );
  }

}
