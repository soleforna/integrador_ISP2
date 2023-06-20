import { Component, OnInit,AfterViewInit,ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { FechaService } from 'src/app/services/fecha.service';
import { ProductsService } from 'src/app/services/products.service';
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
export class DetailsComponent  implements OnInit, AfterViewInit {
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

  constructor(
    private route: ActivatedRoute,
    private FechaService: FechaService,
    private ProductService: ProductsService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

}
