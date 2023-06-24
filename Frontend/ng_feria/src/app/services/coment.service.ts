import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentService {
  private apiUrl = 'http://localhost:8000/api/coments/';

  constructor(private http: HttpClient) { }

  getComent(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // hago un get a la api de comentarios
  }
  sendComents(description: string, classification: number): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const body = {
      description: description,
      classification: classification,
      client_id: user.id
    };

    const tk = localStorage.getItem('token');

    let headers = new HttpHeaders();
    if (tk) {
      headers = new HttpHeaders({
        'Authorization': 'Bearer ' + tk,
        'Content-Type': 'application/json' // Establece el tipo de contenido como JSON
      });
    }

    return this.http.post(this.apiUrl, body, { headers });

  }
}
