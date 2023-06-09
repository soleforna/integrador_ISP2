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



  constructor(
    private route: ActivatedRoute,
    private FechaService: FechaService,
    private Pr: ProductsService
  ) {}


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

  //TODO: Agregar el review al producto. falta terminar
  addReview(coment:string, clasf:number): void {
    let review = {description: coment, classification: clasf}
    this.Pr.agregarReview(parseInt(this.idDetail), review).subscribe((data) => {
      this.reviews.push(data);
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.idDetail = this.route.snapshot.paramMap.get('id')!;
    const productsS = localStorage.getItem('products');
    if (productsS) {
      const products: Product[] = JSON.parse(productsS);

      this.product = products.find(
        (product: Product) => product.id.toString() === this.idDetail
      );
      this.fecha = this.getFecha(this.product.created_at);
      this.categoryDetail = this.product.category.name;

      if (this.product.review) {
        this.reviews = this.product.review;
      }

    } else {
      console.log(
        'No se encontró ningún producto almacenado en el localStorage.'
      );
    }
  }
}

