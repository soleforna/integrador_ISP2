import { Component, OnInit} from '@angular/core';
import {NewsletterService} from 'src/app/services/newsletter.service'
declare const Swal: any; //declaracion para evitar error de typescript

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit{
  correo : string = "";

  opcionSeleccionada : string="";
  productosFiltrados: any[]=[];

  categoriesSet: Set<string> = new Set();

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  registrarCorreo() {
    if (this.correo) {
      this.newsletterService.postNewsletter(this.correo).subscribe(
        () => {

          Swal.fire({ //muestro un mensaje de exito
            title: 'Email registrado exitosamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });

          this.correo = ''; // Limpiar el campo de correo electrónico después de registrar
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire({ //muestro un mensaje de error
              title: 'Error al registrar: ' + error.error.email,
              icon: 'error',
              showConfirmButton: false,
              timer: 1800,
            });
          }
        }
      );
    }
  }

  // metodo para obtener un array de las categorias

  obtenerCategorias() {
    
    const products = JSON.parse(localStorage.getItem('products') ||"");
    console.log(products)
  
    if (products) {
      
      products.forEach((p: { category: { name: string; }; }) => {
        this.categoriesSet.add(p.category.name);
      });
      console.log(this.categoriesSet)
    
     
    }
    
  }

  //metodo para obtener productos filtrados

  filtrarProductos() {
    const products = JSON.parse(localStorage.getItem('products') ||"");

    this.productosFiltrados = products.filter((p: { category: { name: string; }; }) => this.opcionSeleccionada.includes(p.category.name));

  }



}
