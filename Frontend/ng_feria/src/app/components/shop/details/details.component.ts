import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { FechaService } from 'src/app/services/fecha.service';
import { ProductsService } from 'src/app/services/products.service';

interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  categoryDetail!: string;
  idDetail!: string;
  product: Product | any;
  fecha!: string;
  reviews: any[] = [];
  clasf: number = 0;
  coment: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private FechaService: FechaService,
    private ProductService: ProductsService
  ) {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  getAvatarImage(client_Avatar: string): string {
    //paso como argumento el client_avatar
    return client_Avatar ? client_Avatar : '../../../../assets/img/profile.png'; //retorno la imagen que trae y si no le paso una predefinida
  }

  getNombre(client_name: string): string {
    return client_name ? client_name : 'Anónimo';
  }

  getFecha(fecha: string): string {
    return this.FechaService.convertirFecha(fecha);
  }

  //agregar review
  addReview(): void { //llamo al servicio para agregar una review
    let review = { description: this.coment, classification: this.clasf }; //creo un objeto con los datos de la review
    this.ProductService.agregarReview( //llamo al servicio para agregar una review
      parseInt(this.idDetail), //le paso el id del producto
      review //le paso el objeto con los datos de la review
    ).subscribe((data) => { //recibo la respuesta
      this.reviews.push(data); //agrego la review al array de reviews
      window.location.reload();
    });
  }
  //obtener reviews
  ngOnInit(): void {
    this.idDetail = this.route.snapshot.paramMap.get('id')!;
    const productsS = localStorage.getItem('products');
    if (productsS) {
      const products: Product[] = JSON.parse(productsS);

      this.product = products.find( //busco el producto por id
        (product: Product) => product.id.toString() === this.idDetail //lo convierto a string para comparar
      );
      this.fecha = this.getFecha(this.product.created_at); //llamo a la funcion para convertir la fecha
      this.categoryDetail = this.product.category.name; //obtengo el nombre de la categoria

      if (this.product.review) {
        this.reviews = this.product.review; //obtengo las reviews del producto
      }
    } else {
      console.log(
        'No se encontró ningún producto almacenado en el localStorage.'
      );
    }
  }
}
