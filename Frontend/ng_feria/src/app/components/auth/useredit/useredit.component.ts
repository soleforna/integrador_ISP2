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


    const datosAnteriores = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Este es el usuario viejo")
    console.log(datosAnteriores)


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


    console.log("Este es el objeto con los campos nuevos")
    console.log(datosModificados)

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
