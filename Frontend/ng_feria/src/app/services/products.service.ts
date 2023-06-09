import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  agregarReview(id: number, data: any): Observable<any> {
    const tk = localStorage.getItem("token");
    let headers = new HttpHeaders();
    if (tk) {
      headers = new HttpHeaders({
        'Authorization': 'Bearer ' + tk,
        'Content-type': 'application/json'
      });}

      return this.http.post(this.url + "articles/" + id + "/add_review/", data, { headers });

  }

}

