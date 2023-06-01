import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-enviarCorreo',
  templateUrl: './enviarCorreo.component.html',
  styleUrls: ['./enviarCorreo.component.css']
})

export class EnviarCorreoComponent {
  email:any;
  enviarCorreoError: boolean = false;


constructor( public userService: UsersService,public router:Router ) {
   
}

enviarCorreo(){

  this.userService.enviarCorreo(this.email)
   .subscribe(response => {
     console.log(response);
     this.router.navigate(["/token"]); // Redirecciona a token.
     }, error => {
        this.enviarCorreoError = true;
     });

  }






}
