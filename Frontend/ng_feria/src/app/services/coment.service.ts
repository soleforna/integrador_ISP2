import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentService {
  private apiUrl = 'http://localhost:8000/api/coments/';

  constructor(private http: HttpClient) {
    console.log("*** Servicio Comentarios corriendo ***")
  }

  getComent(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // hago un get a la api de comentarios
  }
}
