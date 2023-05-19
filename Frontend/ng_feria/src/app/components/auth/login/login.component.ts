import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm = this.formBuilder.group({
    email:['usuario@gmail.com',[Validators.required, Validators.email]],
    password:['',Validators.required]
  })
  constructor(private formBuilder:FormBuilder, private router:Router){}

  ngOnInit(): void {

  }

}
