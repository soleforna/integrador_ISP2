import { Component,HostListener, ElementRef  } from '@angular/core';
import { UsersService } from "src/app/services/users.service";
import { Router } from '@angular/router';
declare const Swal: any; //declaracion para evitar error de typescript


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  user = JSON.parse(localStorage.getItem("user") || "{}");
  name: string = this.getName(this.user);
  isLoggedIn: boolean = false;
  avatar1 = '../../../../assets/img/profile.png';
  isNavVisible = true;
  lastScrollOffset = 0;

  constructor(public userService: UsersService,private router: Router,private elementRef: ElementRef) {
    // Verifica si el usuario está logueado.
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  // Obtiene el nombre del usuario.
  getName(user: any) {
    // Si el usuario no tiene nombre, entonces muestra su email.
    if (!user || user.first_name == null || user.last_name == null) { // Verifica que el usuario no sea nulo.
      return user.email;
    }
    if (user.first_name == '' || user.last_name == '' || user.first_name == null || user.last_name == null) {
      return user.email;
    }else{return user.first_name +' '+ user.last_name;} // Si el usuario tiene nombre, entonces muestra su nombre.
  }

  getAvatar(user: any) {
    if (!user.avatar || user.avatar === '') {
      return this.avatar1; // Si el usuario no tiene avatar, entonces muestra un avatar predefinido.
    } else {
      return user.avatar; // Si el usuario tiene avatar, entonces muestra su avatar.
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


  logout() { // Cierra la sesión del usuario
    return new Promise<void>((resolve, reject) => {
      Swal.fire({
        title: 'Cerrar Sesión',
        text: '¿Está seguro de que desea cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
      }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          this.userService.logout().subscribe( //Llama al servicio cerrar sesión
            () => {
              Swal.fire(
                'Éxito',
                'Ha cerrado sesión exitosamente.',
                'success'
              );
              setTimeout(() => {
                window.location.reload();// Recarga la pagina
                resolve(); // Resuelve la promesa después de recargar la página
              }, 500); // Espera 1 segundos (1000 milisegundos) antes de recargar la página
            }
          );
        } else {
          Swal.fire(
            'Error',
            'Se canceló el cierre de sesión.',
            'error'
          );
          reject(new Error('Se canceló el cierre de sesión.'));
        }
      }).catch((error: any) => {
        reject(error);
      });
    });
  }



  @HostListener('window:scroll', ['$event']) // Sirve para ocultar y mostrar el nav al hacer scroll
  onWindowScroll(event: Event) {
    const currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (currentScrollOffset > this.lastScrollOffset) {
      this.isNavVisible = false;
    } else {
      this.isNavVisible = true;
    }

    this.lastScrollOffset = currentScrollOffset;
  }

  getNavClasses() {
    return {
      'nav-hidden': !this.isNavVisible,
      'nav-visible': this.isNavVisible
    };
  }
  }






