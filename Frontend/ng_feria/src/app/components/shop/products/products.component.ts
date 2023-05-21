import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/Interfaces/product.interface';

import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = []; 

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
  })
}

  /*
  hoy = new Date(); 
  mostrarMovimientos: boolean=true; 
  movimientos: any; 

constructor(public loadProducts: ProductsService){
  this.loadProducts.obtenerProductos().subscribe({
    next: (productos) =>{
      this.movimientos = productos 
    }, 
    error: (errorData) =>{
      console.error(errorData); 
    }
  })
}

products: Product[] = db.products;
*/
}


