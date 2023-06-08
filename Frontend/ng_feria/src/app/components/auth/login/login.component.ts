import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
declare const Swal: any; //declaracion para evitar error de typescript

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;


  constructor(public userService: UsersService, public router:Router) {
    // Verifica si el usuario está logueado.

  }

  login() {

    this.emailTouched = true;
    this.passwordTouched = true;

    if (!this.email || !this.password) {
      this.emailInvalid = !this.email;
      this.passwordInvalid = !this.password;
      return;
    }

    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe((data: any) => {
      localStorage.setItem("token", data.key);
      this.userService.getUser(); // Obtiene el usuario y lo guarda en el localStorage.
      //TODO: habria que poner un loader
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Ha iniciado sesión correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/producto']); // Redirecciona a la página de productos.
      }).catch((error: any) => {
        console.log(error);
      });
    }, (error: any) => { console.log(error) },

    );

    this.emailInvalid = false;
    this.passwordInvalid = false;
    this.emailTouched = false;
    this.passwordTouched = false;
  }

}
