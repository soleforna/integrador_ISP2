import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReseñaService } from "src/app/services/reseñas.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private ReseñaService: ReseñaService,){ }
  resenas: any[] = [];
  imagenPredefinida = '../../../../assets/img/user.png';

  ngOnInit(): void {
    this.obtenerReseñas();
  }

  obtenerReseñas(): void {
    this.ReseñaService.getReseñas().subscribe(
      (resenas) => {
        this.resenas = resenas;
      },
      (error) => {
        // Manejo de errores
      }
    );
  }

  getEstrellas(clasificacion: number): number[] {
    return Array(clasificacion).fill(0);
  }
  getAvatarImage(client_Avatar: string): string { //paso como argumento el client_avatar
    return client_Avatar ? client_Avatar : '../../../../assets/img/user.png'; //retorno la imagen que trae y si no le paso una predefinida
  }
  getNombre(client_name: string): string {
    return client_name ? client_name : 'Anónimo';
  }


  isScrolled = false;


  scroll(el:HTMLElement){
    el.scrollIntoView()
  }

}
