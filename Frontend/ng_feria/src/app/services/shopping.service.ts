import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private apiUrl = 'http://localhost:8000/api/confirmed-carts/';

  constructor(private http: HttpClient) {
    console.log("*** Servicio shopping corriendo ***")
  }

  getConfirmedCarts(): Observable<any[]> {
    const tk = localStorage.getItem('token');

    let headers = new HttpHeaders();
    if (tk) {
      headers = new HttpHeaders({
        'Authorization': 'Bearer ' + tk,
        'Content-Type': 'application/json' // Establece el tipo de contenido como JSON
      });
    }

    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }
}
