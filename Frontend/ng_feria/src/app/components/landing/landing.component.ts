import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComentService } from "src/app/services/coment.service";
import { FechaService } from "src/app/services/fecha.service";
declare const Swal: any; //declaracion para evitar error de typescript
import { ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {


  coments: any[] = [];
  classification: number = 0;
  description: string = '';
  @ViewChild('closeModal')
  closeModal!: ElementRef;
  modalVisible = false;
  constructor(
    private ComentService: ComentService,
    private FechaService: FechaService,
    private cdRef: ChangeDetectorRef
     ){}

  ngOnInit(): void {
    this.obtenerComentarios();
  }

  obtenerComentarios(): void {
    this.ComentService.getComent().subscribe(
      (comentarios) => {
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
  addComent(comentForm: NgForm): void {


    this.ComentService.sendComents(this.description,this.classification)
      .subscribe((response: any) => {

        console.log(response);
        this.coments.push(response);
        comentForm.reset();
        // Cierra el modal
        this.closeModal.nativeElement.click() //<-- here
        this.cdRef.detectChanges();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Comentario añadido correctamente.',

        });
      }, (error: { status: number; }) => {

        if (error.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al cargar el comentario.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }

}
