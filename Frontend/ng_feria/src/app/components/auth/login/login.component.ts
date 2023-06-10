import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
declare const Swal: any; //declaracion para evitar error de typescript

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(public userService: UsersService, public router: Router) {
    // Verifica si el usuario está logueado.
  }

  login() {
    this.emailTouched = true;
    this.passwordTouched = true;

    if (!this.email || !this.password) {// Verifica que los campos no estén vacíos.
      this.emailInvalid = !this.email; // Si el campo está vacío, se muestra el mensaje de error.
      this.passwordInvalid = !this.password; // Si el campo está vacío, se muestra el mensaje de error.
      return; // Si hay algún campo vacío, no se ejecuta el resto de la función.
    }

    const user = { email: this.email, password: this.password }; // Crea un objeto con los datos del usuario.

    this.userService.login(user).subscribe( // Llama al servicio de login.
      (data: any) => {
                localStorage.setItem('token', data.key); // Guarda el token en el localStorage.
        this.userService.getUser(); // Obtiene el usuario y lo guarda en el localStorage.
        //TODO: habria que poner un loader
        Swal.fire({
          // Mensaje de éxito.
          position: 'top-center',
          icon: 'success',
          title: 'Ha iniciado sesión correctamente',
          showConfirmButton: false,
          timer: 1500,
        })
          .then(() => {
            this.router.navigate(['/producto']); // Redirecciona a la página de productos.
          })
          .catch((error: any) => {
            console.log(error);
          });
      },
      (error: any) => {
        if (error.status == 400) {
          Swal.fire({
            // Mensaje de error.
            position: 'center',
            icon: 'error',
            title: 'El usuario o la contraseña son incorrectos',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    );

    this.emailInvalid = false;
    this.passwordInvalid = false;
    this.emailTouched = false;
    this.passwordTouched = false;
  }
}
