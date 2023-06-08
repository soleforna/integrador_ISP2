import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/product.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url:String = "http://localhost:8000/api/"
  constructor(private http:HttpClient) {
    console.log("Servicio corriendo");
  }

  obtenerProductos(): Observable <any>{
    return this.http.get(this.url+"articles")
  }




}

