import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { DatosgeograficosService } from 'src/app/services/datosgeograficos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css'],
})
export class UsereditComponent implements OnInit {
  formData: any;
  calle: string | undefined;
  ciudad: string | undefined;
  provinciaActual: string | undefined;
  provincias: string[] = [];
  municipios: any;
  storedData: any;

  constructor(
    private dg: DatosgeograficosService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {

    this.storedData = localStorage.getItem('user');

    if (this.storedData != null) {
      this.formData = JSON.parse(this.storedData);
      const pk = this.formData.id;
      let direccion: string = '';
      if(this.formData.first_name == null || this.formData.first_name == ''){ //si el nombre es null
        this.formData.first_name = 'Ingrese su nombre';
      }
      if(this.formData.last_name == null || this.formData.first_name == ''){ //si el apellido es null
        this.formData.first_name = 'Ingrese su apellido';
      }
      if(this.formData.phone == null){ //si el telefono es null
        this.formData.phone = 'Ingrese su número de teléfono';
      }
      //si la direccion es null o vacia o undefined
      if (this.formData.address == null || this.formData.address == '' || this.formData.address == undefined) {
        this.calle = 'Ingrese calle y número';
        this.ciudad = '';
        this.provinciaActual = '';
      } else {
        direccion = this.formData.address;
        const resultado = this.dividirDireccion(direccion);
        this.calle = resultado.calle;
        this.ciudad = resultado.ciudad;
        this.provinciaActual = resultado.provincia;
        this.obtenerMunicipios();
      }
    }
    this.obtenerProvincias();
  }

  obtenerProvincias() {
    this.dg.obtenerDatosProvincias().subscribe(
      (response) => {
        /* Guardo las provincias en el session storage */
        const provinciasString = JSON.stringify(response);
        sessionStorage.setItem('provincias', provinciasString);
        if (provinciasString) { //si hay provincias
          const provinciasObj = JSON.parse(provinciasString);
          const nombresProvincias = provinciasObj.provincias.map(
            (provincia: any) => provincia.nombre
          );
          this.provincias = nombresProvincias;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerMunicipios() {
    if (this.provinciaActual) {
      this.dg.obtenerDatosMunicipio(this.provinciaActual).subscribe(
        (response) => {
          /* Guardo los municipios en el session storage */
          const municipiosString = JSON.stringify(response);
          sessionStorage.setItem('municipios', municipiosString);
          if (municipiosString) { //si hay municipios
            const municipiosObj = JSON.parse(municipiosString);
            const nombresMunicipios = municipiosObj.municipios.map(
              (municipios: any) => municipios.nombre
            );
            this.municipios = nombresMunicipios;
          }
          //console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  dividirDireccion(address: string): {
    calle: string;
    ciudad: string;
    provincia: string;
  } {
    const partes: string[] = address.split(',') || ['Ingrese su dirección',];
    const calle: string = partes[0].trim();
    const ciudad: string = partes[1].trim();
    const provincia: string = partes[2].trim();

    return {
      calle: calle,
      ciudad: ciudad,
      provincia: provincia,
    };
  }

  cambiarProvincia(provincia: string) {
    provincia.replace(/\s+/g, '_');
    this.obtenerMunicipios();
  }

  submitForm() {
    const domicilio =
      (document.getElementById('inputAddress') as HTMLInputElement)?.value +
      ', ' +
      (document.getElementById('inputCity') as HTMLSelectElement)?.value +
      ', ' +
      (document.getElementById('inputState') as HTMLSelectElement)?.value;
    const datosAnteriores = JSON.parse(localStorage.getItem('user') || '{}');
    const datosModificados: any = {};

    if ((document.getElementById('firstName') as HTMLInputElement)?.value !== datosAnteriores.first_name) {
      datosModificados.first_name = (document.getElementById('firstName') as HTMLInputElement)?.value;
    }

    if ((document.getElementById('lastName') as HTMLInputElement)?.value !== datosAnteriores.last_name) {
      datosAnteriores.last_name = (document.getElementById('lastName') as HTMLInputElement)?.value;
    }

    if (domicilio !== datosAnteriores.domicilio) {
      datosModificados.address = domicilio;
    }

    if ((document.getElementById('phone') as HTMLInputElement)?.value !== datosAnteriores.phone) {
      datosModificados.phone = (document.getElementById('phone') as HTMLInputElement)?.value;
    }

    datosModificados.id =datosAnteriores.id;

    this.usersService.actualizarUsuario(datosModificados).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/producto']); // Redirecciona a la página de productos.
      },
      (error) => {
        // Manejo de errores
        console.log(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/producto']); // Redirecciona a la página de productos.
  }
}
