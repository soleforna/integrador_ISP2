import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private ps: ProductsService) {}

  ngOnInit(): void {
    this.ps.obtenerProductos().subscribe(
      (data) => {
        this.products = data;
        localStorage.setItem('products', JSON.stringify(this.products));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
