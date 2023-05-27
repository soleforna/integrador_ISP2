import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
 

  constructor(private http: HttpClient) { }


  loginWithGoogle(provider: string) {
    window.location.href = `http://127.0.0.1:8000/accounts${provider}/login/`;
  }
}