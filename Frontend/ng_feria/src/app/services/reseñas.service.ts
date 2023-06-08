import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReseñaService {
  private apiUrl = 'http://localhost:8000/api/reviews/';


  constructor(private http: HttpClient) { }

  getReseñas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  } // hago un get a la api de reviews




}
