import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
declare const Swal: any; //declaracion para evitar error de typescript

@Component({
  selector: 'app-enviarCorreo',
  templateUrl: './enviarCorreo.component.html',
  styleUrls: ['./enviarCorreo.component.css']
})

export class EnviarCorreoComponent {
  email:any;
  enviarCorreoError: boolean = false;
  constructor( public userService: UsersService, public router:Router) { }

  sendEmail() {
    this.userService.sendEmail(this.email)
      .subscribe(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Token enviado correctamente al correo.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/token']); // Redirecciona a token.
        });
      }, error => {
        this.enviarCorreoError = true;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al enviar el token al correo.',
          confirmButtonText: 'Aceptar'
        });
      });
  }


}
