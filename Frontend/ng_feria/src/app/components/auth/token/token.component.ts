import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
declare const Swal: any; //declaracion para evitar error de typescript


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})


export class TokenComponent{
  password:any;
  token:any;

  enviarTokenError: boolean = false;
  constructor( public userService: UsersService, public router:Router) { }




sendToken() {
  this.userService.sendToken(this.password,this.token)
    .subscribe(response => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Password cambiado correctamente.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/inicio']); // Redirecciona a inicio.
      });
    }, error => {
      this.enviarTokenError = true;
      if (error.status == 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cambiar el password.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
}








}
