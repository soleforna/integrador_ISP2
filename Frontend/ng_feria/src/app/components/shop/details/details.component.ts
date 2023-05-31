import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';

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

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {

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

