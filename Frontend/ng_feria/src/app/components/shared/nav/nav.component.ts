import { Component } from '@angular/core';
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  user = JSON.parse(localStorage.getItem("user") || "{}");
  name: string = this.getName(this.user) ;
  isLoggedIn: boolean = false;

  constructor(public userService: UsersService) {
    // Verifica si el usuario está logueado.
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  // Obtiene el nombre del usuario.
  getName(user: any) {
    // Si el usuario no tiene nombre, entonces muestra su email.
    if (user.first_name == '' || user.last_name == '' || user.first_name == null || user.last_name == null) {
      return user.email;
    }else{return user.first_name+' '+ user.last_name;}// Si el usuario tiene nombre, entonces muestra su nombre.
  }

  // Cierra la sesión del usuario.
  logout() {
    this.userService.logout();//llama al servicio para cerrar la sesion
    window.location.reload();// Recarga la página.
  }



}


