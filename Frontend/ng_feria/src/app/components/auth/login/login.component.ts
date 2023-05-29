import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email: string = "";
  password: string = "";


  constructor(public userService: UsersService, public router:Router) {
    // Verifica si el usuario está logueado.

  }

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe((data: any) => {
      localStorage.setItem("token", data.key);
      this.userService.getUser(); // Obtiene el usuario y lo guarda en el localStorage.
      //TODO: habria que poner un loader
      this.router.navigate(["/producto"]); // Redirecciona a la página de productos.
    }, (error: any) => { console.log(error) },

    );
  }
}
