import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/services/shopping.service';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnChanges {
  @Input() shopping: any[] = [];
  fromDate!: string;
  toDate!: string;
  filteredShopping: any[] = [];
  noResults: boolean = false;
  dataLoaded: boolean = false;

  constructor(private shoppingService: ShoppingService, private fechaService: FechaService) {}

  ngOnInit(): void {
    this.shoppingService.getConfirmedCarts().subscribe(
      (data) => {
        this.shopping = data;
        this.filteredShopping = data;
        localStorage.setItem('shopping', JSON.stringify(this.shopping));

        this.filterByDate(); // Aplicar el filtrado inicial
        this.dataLoaded = true; // Indicar que los datos se han cargado correctamente
      },
      (error) => {
        console.log(error);
        this.dataLoaded = true; // Indicar que los datos se han cargado aunque haya ocurrido un error
      }
    );
  }

  ngOnChanges(): void {
    this.filterByDate();
  }

  filterByDate(): void {
    if (this.fromDate && this.toDate) {
      const fromDateObj = new Date(this.fromDate);
      const toDateObj = new Date(this.toDate);
  
      this.filteredShopping = this.shopping.filter((shopp) => {
        const shoppDateObj = new Date(shopp.created_at);
        return shoppDateObj >= fromDateObj && shoppDateObj <= toDateObj;
      });
  
      this.noResults = this.filteredShopping.length === 0; // Verificar si no hay resultados
    } else {
      this.filteredShopping = this.shopping;
      this.noResults = false;
    }
  }

  getFecha(fecha: string): string {
    return this.fechaService.convertirFecha(fecha);
  }

  updateFilter(): void {
    this.filterByDate();
  }
  resetFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.filterByDate();
  }
  
}
