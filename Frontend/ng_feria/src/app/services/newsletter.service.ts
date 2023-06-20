import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'http://localhost:8000/api/newsletter/';

  constructor(private http: HttpClient) { }

// metodo para registrar un nuevo mail
postNewsletter(mail:string): Observable<any[]> {
  const formData = new FormData(); // objeto de tipo formdata 
  formData.append('email', mail);
    return this.http.post<any[]>(this.apiUrl, formData); 
  }
}


