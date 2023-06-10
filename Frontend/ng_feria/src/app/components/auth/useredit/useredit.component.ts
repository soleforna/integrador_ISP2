import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
/* import { Router } from "@angular/router"; */


@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})

export class UsereditComponent implements OnInit {

  formData: any;
  router: any;

  constructor(private http: HttpClient, private usersService: UsersService) { }

  // Creo una función para tomar los datos del formulario y guardarlos en un objeto

  submitForm() {
    // Armo el string de domicilio+ciudad+provincia

    const domicilio = (document.getElementById('inputAddress') as HTMLInputElement)?.value+", "+(document.getElementById('inputCity') as HTMLSelectElement)?.value+", "+(document.getElementById('inputState') as HTMLSelectElement)?.value

    

    // Crear el objeto de datos a enviar al backend
    const datos = {
      id: localStorage.getItem('user.pk'),
      first_name: (document.getElementById('firstName') as HTMLInputElement)?.value,
      last_name: (document.getElementById('lastName') as HTMLInputElement)?.value,
      email: (document.getElementById('Email') as HTMLInputElement)?.value,
      password: (document.getElementById('inputPassword') as HTMLInputElement)?.value,
      domicilio: domicilio,
      telefono: (document.getElementById('phone') as HTMLInputElement)?.value,
      codigoPostal: (document.getElementById('inputZip') as HTMLInputElement)?.value,
    };

    // Enviar los datos al servicio
    this.usersService.actualizarUsuario(datos).subscribe(
      (response) => {
        this.router.navigate(["/productos"]); // Redirecciona a productos
      },
      (error) => {
        // Manejo de errores
      }
    );
  }


  ngOnInit() {
    /* Obtengo la información del local Storage */
    const storedData = localStorage.getItem('user');
    if (storedData != null){
      this.formData = JSON.parse(storedData);
    }





  }

}
