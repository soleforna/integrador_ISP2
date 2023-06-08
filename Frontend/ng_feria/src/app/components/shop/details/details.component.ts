import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';
import { ReseñaService } from "src/app/services/reseñas.service";
import { FechaService } from "src/app/services/fecha.service";


interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit{
  //categoryDetail!: string;
  idDetail!: string;
  product: Product | undefined;
  baseUrl = 'http://localhost:8000';


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private ReseñaService: ReseñaService, private FechaService: FechaService,
  ) {

  }
   isLoggedIn: boolean = false;

  getAvatarImage(client_Avatar: string): string { //paso como argumento el client_avatar
    return client_Avatar ? client_Avatar : '../../../../assets/img/profile.png'; //retorno la imagen que trae y si no le paso una predefinida
  }

  getNombre(client_name: string): string {
    return client_name ? client_name : 'Anónimo';
  }

  getFecha(fecha: string): string {
    return this.FechaService.convertirFecha(fecha);
  }


  ngOnInit(): void {

    this.idDetail = this.route.snapshot.paramMap.get('id')!;
    const productsS=localStorage.getItem("products");
    if (productsS) {
        const products: Product[] = JSON.parse(productsS);

            this.product = products.find(
            (product: Product) =>
             product.id.toString() === this.idDetail
             );

    } else {
      console.log("No se encontró ningún producto almacenado en el localStorage.");
    }
  }
}

