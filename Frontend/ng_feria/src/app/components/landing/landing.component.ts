import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComentService } from "src/app/services/coment.service";
import { FechaService } from "src/app/services/fecha.service";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private ComentService: ComentService, private FechaService: FechaService){}

  coments: any[] = [];


  ngOnInit(): void {
    this.obtenerComentarios();
  }

  obtenerComentarios(): void {
    this.ComentService.getComent().subscribe(
      (comentarios) => {
        console.log(comentarios);
        this.coments = comentarios;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  getAvatarImage(client_Avatar: string): string { //paso como argumento el client_avatar
    return client_Avatar ? client_Avatar : '../../../../assets/img/profile.png'; //retorno la imagen que trae y si no le paso una predefinida
  }

  getNombre(client_name: string): string {
    return client_name ? client_name : 'Anónimo';
  }

  getFecha(fecha: string): string {
    return this.FechaService.convertirFecha(fecha);
  }


  isScrolled = false;


  scroll(el:HTMLElement){
    el.scrollIntoView()
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token == null; // No hay token en el local storage
  }

}
