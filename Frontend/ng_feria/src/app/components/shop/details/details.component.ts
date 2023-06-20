import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { FechaService } from 'src/app/services/fecha.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
declare const Swal: any; //declaracion para evitar error de typescript

interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
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
    private ProductService: ProductsService,
    private CartService: CartService,
    private router: Router
  ) {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  ngAfterViewInit() { //metodo que se ejecuta despues de que se inicia la vista
    window.scrollTo(0, 0); //hago scroll hasta arriba
  }

  getAvatarImage(client_Avatar: string): string {//paso como argumento el client_avatar
    return client_Avatar ? client_Avatar : '../../../../assets/img/profile.png'; //retorno la imagen que trae y si no le paso una predefinida
  }

  getNombre(client_name: string): string { //paso como argumento el client_name
    return client_name ? client_name : 'Anónimo'; //retorno el nombre que trae y si no le paso un predefinido
  }

  getFecha(fecha: string): string { //paso como argumento la fecha
    return this.FechaService.convertirFecha(fecha); //retorno la fecha convertida
  }

  //metodo para agregar una review
  addReview(): void {//llamo al servicio para agregar una review
    let review = { description: this.coment, classification: this.clasf }; //creo un objeto con los datos de la review
    this.ProductService.agregarReview(//llamo al servicio para agregar una review
      parseInt(this.idDetail), //le paso el id del producto
      review //le paso el objeto con los datos de la review
    ).subscribe((data) => {//recibo la respuesta
      this.reviews.push(data); //agrego la review al array de reviews
    });
  }

  //metodo para agregar al carrito
  addCart(): void {
    console.log('Agregando al carrito con el siguiente ID de articulo: ' + this.idDetail);
    this.CartService.addArticleToCart( //llamo al servicio para agregar al carrito
      parseInt(this.idDetail) //le paso el id del producto
    );
  }

  //Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.idDetail = this.route.snapshot.paramMap.get('id')!; //obtengo el id del producto
    const productsS = localStorage.getItem('products'); //obtengo los productos del localStorage
    if (productsS) { //si hay productos
      const products: Product[] = JSON.parse(productsS); //los convierto a JSON

      this.product = products.find(//busco el producto por id
        (product: Product) => product.id.toString() === this.idDetail //lo convierto a string para comparar
      );
      this.fecha = this.getFecha(this.product.created_at); //llamo a la funcion para convertir la fecha
      this.categoryDetail = this.product.category.name; //obtengo el nombre de la categoria

      if (this.product.review) { //si hay reviews
        this.reviews = this.product.review; //obtengo las reviews del producto
      }
    } else { //si no hay productos
      console.log('No se encontró ningún producto almacenado en el localStorage.');
    }
    this.router.events.subscribe(event => { //suscribo el router a un evento
      if (event instanceof NavigationEnd) { //si se navega a otra pagina
        window.scrollTo(0, 0); //hago scroll hasta arriba
      }
    });
  }
}
