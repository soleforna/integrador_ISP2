import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FechaService } from 'src/app/services/fecha.service';
import { Params } from '@angular/router';


@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {
  idDetail!: string;
  fecha!: string;
  shopping: any[] = [];
  products: any[] = [];
  carrito:any;
  FechaService: any;

  constructor(
    private router: ActivatedRoute,
  ) {

  }
  getFecha(fecha: string): string { //paso como argumento la fecha
    return this.FechaService.convertirFecha(fecha); //retorno la fecha convertida
  }
  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      const carritoId = Number(params['id']);

      // Obtener datos del Local Storage
      const shoppingData = localStorage.getItem('shopping');
      if (shoppingData) {
        const shopping = JSON.parse(shoppingData);
        const carrito = shopping.find((shopp: any) => shopp.id === carritoId); // comprueba id del elemento es igual a carritoId.

        if (carrito) {
          this.products = carrito.products;
        } else {
          // Si el carrito no existe, realiza alguna acción, como mostrar un mensaje de error o redireccionar a una página de error.
        }
      }
    });
  }
}


