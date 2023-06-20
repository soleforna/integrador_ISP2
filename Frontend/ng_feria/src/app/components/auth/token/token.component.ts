import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})


export class TokenComponent{
  token:any;
  enviarTokenError: boolean = false;
  constructor( public userService: UsersService, public router:Router) { }



  sendToken() {
    this.userService.sendToken(this.token)
     .subscribe(response => {
       console.log(response);
       this.router.navigate(["/inicio"]); // Redirecciona a inicio.
       }, error => {
        this.enviarTokenError = true;
       });
  
    }








}
