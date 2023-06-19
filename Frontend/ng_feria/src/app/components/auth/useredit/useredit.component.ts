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

  constructor(
    private dg: DatosgeograficosService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedData = localStorage.getItem('user');
    if (storedData != null) {
      this.formData = JSON.parse(storedData);
      const pk = this.formData.id;
      const direccion: string = this.formData.address;
      const resultado = this.dividirDireccion(direccion);
      this.calle = resultado.calle;
      this.ciudad = resultado.ciudad;
      this.provinciaActual = resultado.provincia;
      console.log(this.ciudad);
    }

    this.obtenerProvincias();
    this.obtenerMunicipios();
  }

  obtenerProvincias() {
    this.dg.obtenerDatosProvincias().subscribe(
      (response) => {
        /* Guardo las provincias en el local storage */
        const provinciasString = JSON.stringify(response);
        localStorage.setItem('provincias', provinciasString);

        if (provinciasString) {
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
          /* Guardo los municipios en el local storage */
          const municipiosString = JSON.stringify(response);
          localStorage.setItem('municipios', municipiosString);

          if (municipiosString) {
            const municipiosObj = JSON.parse(municipiosString);
            const nombresMunicipios = municipiosObj.municipios.map(
              (municipios: any) => municipios.nombre
            );
            this.municipios = nombresMunicipios;
            console.log(this.municipios);
          }

          console.log(response);
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
    const partes: string[] = address.split(',');
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
    console.log('Hola');

    const usuarioNuevo = JSON.parse(localStorage.getItem('user') || '{}');
    const datos = {
      id: usuarioNuevo.id,
      first_name: (document.getElementById('firstName') as HTMLInputElement)
        ?.value,
      last_name: (document.getElementById('lastName') as HTMLInputElement)
        ?.value,
      email: (document.getElementById('Email') as HTMLInputElement)?.value,
      password: (document.getElementById('inputPassword') as HTMLInputElement)
        ?.value,
      domicilio: domicilio,
      telefono: (document.getElementById('phone') as HTMLInputElement)?.value,
    };
    console.log("chau")
    console.log(datos.id)

    this.usersService.actualizarUsuario(datos).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
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
