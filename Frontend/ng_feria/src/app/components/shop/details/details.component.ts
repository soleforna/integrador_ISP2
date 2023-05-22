import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';

interface RouteParams {
  category: string;
  id: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit{
  categoryDetail!: string;
  idDetail!: string;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {

  }

  ngOnInit(): void {
    this.categoryDetail = this.route.snapshot.paramMap.get('category')!;
    this.idDetail = this.route.snapshot.paramMap.get('id')!;
    this.productsService.obtenerProductos().subscribe((products: Product[]) => {
      this.product = products.find(
        (product: Product) =>
          product.category === this.categoryDetail && 
          product.id.toString() === this.idDetail
      );
    });
  }

}
