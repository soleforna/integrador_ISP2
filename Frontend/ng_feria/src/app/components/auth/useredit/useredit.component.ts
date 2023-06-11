import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  formData: any;
  calle: string | undefined;
  ciudad: string | undefined;
  provincia: string | undefined;


  constructor(private usersService: UsersService) {}

  ngOnInit() {
    const storedData = localStorage.getItem('user');
    if (storedData != null) {
      this.formData = JSON.parse(storedData);
      const direccion: string = this.formData.address;
      const resultado = this.dividirDireccion(direccion);
      this.calle = resultado.calle;
      this.ciudad = resultado.ciudad;
      this.provincia = resultado.provincia;
    }
  }

  dividirDireccion(address: string): { calle: string; ciudad: string; provincia: string } {
    const partes: string[] = address.split(',');
    const calle: string = partes[0].trim();
    const ciudad: string = partes[1].trim();
    const provincia: string = partes[2].trim();

    return {
      calle: calle,
      ciudad: ciudad,
      provincia: provincia
    };
  }



  submitForm() {
    console.log("Estoy en submit");


    const domicilio =
      (document.getElementById('inputAddress') as HTMLInputElement)?.value +
      ', ' +
      (document.getElementById('inputCity') as HTMLSelectElement)?.value +
      ', ' +
      (document.getElementById('inputState') as HTMLSelectElement)?.value;
      console.log(domicilio);

    const datos = {
      id: localStorage.getItem('user.pk'),
      first_name: (document.getElementById('firstName') as HTMLInputElement)?.value,
      last_name: (document.getElementById('lastName') as HTMLInputElement)?.value,
      email: (document.getElementById('Email') as HTMLInputElement)?.value,
      password: (document.getElementById('inputPassword') as HTMLInputElement)?.value,
      domicilio: domicilio,
      telefono: (document.getElementById('phone') as HTMLInputElement)?.value
    };
    console.log(datos);
    this.usersService.actualizarUsuario(datos).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response));
      },
      (error) => {
        // Manejo de errores
        console.log(error)
      }
    );
  }
}
