import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: String = 'http://localhost:8000/api/';
  cartId: number = parseInt(localStorage.getItem('cartId') || '0');
  //constructor
  constructor(private http: HttpClient) {
    console.log('Servicio Carrito corriendo');
  }
  //METODOS PUBLICOS
  //Agregar Articulo a un carrito de compras
  addArticleToCart(id: number): void {
    const tk = localStorage.getItem('token');
    //const cart = JSON.parse(localStorage.getItem("cart") || '{}');
    if (this.cartId === 0) {
      // Si no hay carrito en el local storage
      if (tk) {
        // Si hay un usuario logueado
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        this.createCart(userData.id).subscribe(
          (res: number) => {
            this.cartId = res;
            this.createCartDetails(id); // Crear el cartdetails después de obtener el ID del carrito
            this.getCart(this.cartId).subscribe( // Obtener el carrito después de crearlo
              (cartData: any) => {
                this.updateLocalStorageCart(cartData); // Actualizar el carrito en el local storage
              },
              (error: any) => { // Manejo de errores
                console.log(error);
              }
            );
          },
          (error: any) => { // Manejo de errores
            console.log(error);
          }
        );
      } else {
        // Si no hay un usuario logueado
        this.createCart(0).subscribe(  // Crear el carrito con el ID del usuario en 0
          (res: number) => {
            this.cartId = res; // Se obtiene el ID del carrito
            this.createCartDetails(id); // Crear el cartdetails después de obtener el ID del carrito
            this.getCart(this.cartId).subscribe( // Obtener el carrito después de crearlo
              (cartData: any) => {
                this.updateLocalStorageCart(cartData); // Actualizar el carrito en el local storage
              },
              (error: any) => { // Manejo de errores
                console.log(error);
              }
            );
          },
          (error: any) => { // Manejo de errores
            console.log(error);
          }
        );
      }
    } else {
      // Si ya hay un carrito en el local storage
      this.createCartDetails(id); // Agregar el artículo al carrito existente
      this.getCart(this.cartId).subscribe(
        (cartData: any) => {
          this.updateLocalStorageCart(cartData); // Actualizar el carrito en el local storage
        },
        (error: any) => {
          console.log(error); // Manejo de errores
        }
      );
    }
  }

  //Obtener el carrito por id
  getCart(id: number): Observable<any> {
      return this.http.get(this.url + 'cart/' + id + '/');
    }

  // METODOS PRIVADOS
  //Actualizar el carrito en el local storage solo guarda el ID del carrito y la cantidad de productos
  private updateLocalStorageCart(cartData: any): void {
    localStorage.setItem('cartId', this.cartId.toString());
    let cartCount = cartData.products.length === 0 ? cartData.products.length + 1 : cartData.products.length;
    localStorage.setItem('cartCount', cartCount.toString());
  }

  //Crear un carrito
  private createCart(data: number): Observable<number> {
    let cart: Observable<any>; //Se define una variable de tipo Observable

    if (data > 0) {
      //Si hay un usuario logueado
      cart = this.http.post(this.url + 'cart/', { client: data });
    } else {
      //Si no hay un usuario logueado
      cart = this.http.post(this.url + 'cart/', {});
    }

    return cart.pipe(
      //Se obtiene el carrito
      map((res: any) => {
        //Se obtiene el id del carrito
        return res.id; //Se retorna el id del carrito
      }),
      catchError((error: any) => {
        //Si hay un error
        console.log(error); //Se imprime el error
        return throwError(error); //Se retorna el error
      })
    );
  }

  //Crear un detalle de carrito
  private createCartDetails(articleId: number): void {
    const cartDetailsData = {
      cart: this.cartId,
      item: articleId,
      quantity: 1,
    };

    this.http.post(this.url + 'cartdetails/', cartDetailsData).subscribe(
      (res: any) => {
        console.log('Detalle Carrito Creado:', res);
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

} //fin de clase
