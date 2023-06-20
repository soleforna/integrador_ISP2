import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //Definicion de variables
  url:String = "http://localhost:8000/api/"
  //constructor
  constructor(private http:HttpClient) {
    console.log("Servicio Productos corriendo");
  }
  //Metodos
  //Obtener productos de la API
  obtenerProductos(): Observable <any>{
    return this.http.get(this.url+"articles")
  }

  //Agregar una reseña a un producto
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

}//fin de clase
