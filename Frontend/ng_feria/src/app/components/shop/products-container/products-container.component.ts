import { Component } from '@angular/core';
import {NewsletterService} from 'src/app/services/newsletter.service'
declare const Swal: any; //declaracion para evitar error de typescript

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent {
  correo : string = '';

  constructor(private newsletterService: NewsletterService) {}

  registrarCorreo() {
    if (this.correo) {
      this.newsletterService.postNewsletter(this.correo).subscribe(
        () => {

          Swal.fire({ //muestro un mensaje de exito
            title: 'Email registrado exitosamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });

          this.correo = ''; // Limpiar el campo de correo electrónico después de registrar
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire({ //muestro un mensaje de error
              title: 'Error al registrar: ' + error.error.email,
              icon: 'error',
              showConfirmButton: false,
              timer: 1800,
            });
          }
        }
      );
    }
  }

}
