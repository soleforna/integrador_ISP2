import { Component  } from '@angular/core';
import { UsersService } from "src/app/services/users.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  user = JSON.parse(localStorage.getItem("user") || "{}");
  name: string = this.getName(this.user) ;
  isLoggedIn: boolean = false;
  avatar1 = '../../../../assets/img/profile.png';

  constructor(public userService: UsersService,private router: Router) {
    // Verifica si el usuario está logueado.
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  // Obtiene el nombre del usuario.
  getName(user: any) {
    // Si el usuario no tiene nombre, entonces muestra su email.
    if (user.first_name == '' || user.last_name == '' || user.first_name == null || user.last_name == null) {
      return user.email;
    }else{return user.first_name +' '+ user.last_name;} // Si el usuario tiene nombre, entonces muestra su nombre.
  }

  getAvatar(user: any) {
    if (!user.client_avatar || user.client_avatar === '') {
      return this.avatar1; // Si el usuario no tiene avatar, entonces muestra un avatar predefinido.
    } else {
      return user.client_avatar; // Si el usuario tiene avatar, entonces muestra su avatar.
    }
  }
  isProductsPage(): boolean {
    const url = this.router.url;
    return url.includes('producto')  || url.includes('productos')  || url.includes('tienda')  || url.includes('checkout')
      || url.includes('detalle')  || url.includes('checkout-card'); //llamo a los componentes
       // si esta en estos componentes muestra los enlases de la tienda
  }

  isLandingPage(): boolean {
    return this.router.url.includes('inicio');// si esta en inicio muestra los enlsases del landig
  }



  // Cierra la sesión del usuario.
  logout() {
    this.userService.logout();//llama al servicio para cerrar la sesion
    window.location.reload();// Recarga la página.
  }



}


