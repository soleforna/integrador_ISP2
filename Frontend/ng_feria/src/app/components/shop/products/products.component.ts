import { Component,Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
declare const Swal: any; //declaracion para evitar error de typescript

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];
  idProduct!: string;
  isAdd: boolean = false;

  constructor(private productService: ProductsService, private CartService: CartService) {}

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
  addCart(productId: string){
    console.log('Agregando al carrito con el siguiente ID de articulo: ' + productId);
    this.CartService.addArticleToCart(parseInt(productId)).subscribe((data) => {
      this.isAdd = data; //recibo la respuesta
    if(this.isAdd){
      Swal.fire({ //muestro un mensaje de exito
        title: 'Artículo agregado al carrito',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload(); // refrescar la página
      });

    }else{
      Swal.fire({ //muestro un mensaje de error
        title: 'El artículo ya existe en el carrito',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
  }

}
