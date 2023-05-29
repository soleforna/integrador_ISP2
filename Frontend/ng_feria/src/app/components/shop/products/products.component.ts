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
  products: any[] = [];

  constructor(private ps:ProductsService) {}

  ngOnInit(): void {
    this.ps.obtenerProductos().subscribe(data=> {
      this.products = data;
      console.log(this.products)
    },error =>{
      console.log(error)
    });

    }
}





