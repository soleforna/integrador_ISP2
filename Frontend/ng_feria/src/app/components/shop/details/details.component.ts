import { Component, OnInit, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { FechaService } from 'src/app/services/fecha.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
declare const Swal: any; //declaracion para evitar error de typescript
import { ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;
  modalVisible = false;
  categoryDetail!: string;
  idDetail!: string;
  product: Product | any;
  fecha!: string;
  reviews: any[] = [];
  clasf: number = 0;
  coment: string = '';
  isLoggedIn: boolean = false;
  isAdd: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private FechaService: FechaService,
    private ProductService: ProductsService,
    private CartService: CartService,
    private router: Router,
    private cdRef: ChangeDetectorRef
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
  addReview(reviewForm: NgForm): void {
    let review = { description: this.coment, classification: this.clasf };
    this.ProductService.agregarReview(parseInt(this.idDetail), review).subscribe(
      (data) => {
        this.reviews.push(data);
        reviewForm.reset();
        // Cierra el modal
        this.closeModal.nativeElement.click() //<-- here
        this.cdRef.detectChanges();


        // Mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La reseña se agregó correctamente.',
          confirmButtonText: 'Aceptar'
        });

      },
      (error) => {
        if (error.status == 400) {
        // Mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al agregar la reseña.',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    );
  }

  //metodo para agregar al carrito
  addCart(){
    console.log('Agregando al carrito con el siguiente ID de articulo: ' + this.idDetail);
    this.CartService.addArticleToCart(parseInt(this.idDetail)).subscribe((data) => {
      this.isAdd = data; //recibo la respuesta
    if(this.isAdd){
      Swal.fire({ //muestro un mensaje de exito
        title: 'Artículo agregado al carrito',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload(); // refrescar la página
      });

    }else{
      Swal.fire({ //muestro un mensaje de error
        title: 'El artículo ya existe en el carrito',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
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
