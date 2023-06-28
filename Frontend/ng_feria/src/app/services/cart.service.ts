import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: string = 'http://localhost:8000/api/';
  cartId: number = parseInt(localStorage.getItem('cartId') || '0');

  constructor(private http: HttpClient) {
    console.log('*** Servicio Carrito corriendo ***');
  }

  addArticleToCart(id: number): Observable<boolean> { // Agregar producto al carrito
    const tk = localStorage.getItem('token'); // Obtener token de localStorage
    if (this.cartId === 0) { // Si no hay carrito
      if (tk) { // Si hay token
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        return this.createCart(userData.id).pipe( // Crear carrito
          switchMap((res: number) => { // Crear detalle de carrito
            this.cartId = res;
            return this.createCartDetails(id).pipe(
              catchError((error: any) => { // Si no se pudo crear el detalle de carrito
                return throwError(error);
              })
            );
          }),
          catchError((error: any) => { // Si no se pudo crear el carrito
            return throwError(error);
          })
        );
      } else {
        return this.createCart(0).pipe( // Crear carrito
          switchMap((res: number) => { // Crear detalle de carrito
            this.cartId = res;
            return this.createCartDetails(id).pipe(
              catchError((error: any) => { // Si no se pudo crear el detalle de carrito
                return throwError(error);
              })
            );
          }),
          catchError((error: any) => { // Si no se pudo crear el carrito
            return throwError(error);
          })
        );
      }
    } else {
      return this.createCartDetails(id).pipe( // Crear detalle de carrito
        catchError((error: any) => { // Si no se pudo crear el detalle de carrito
          return throwError(error);
        })
      );
    }
  }

  getCart(id: number): Observable<any> { // Obtener carrito
    return this.http.get(this.url + 'cart/' + id + '/');
  }

  delItemCart(idCart: number, idItem: number): Observable<any> { // Eliminar producto del carrito
    return this.http.post(this.url + 'cart/' + idCart + '/remove_product/',{
        "product_id": idItem
      });
  }

  updateLocalStorageCart(): void { // Actualizar carrito en localStorage
    localStorage.setItem('cartId', this.cartId.toString()); // Actualizar ID de carrito en localStorage
    this.getCart(this.cartId).subscribe( // Actualizar cantidad de productos en localStorage
      (cartData: any) => {
        const cartCount = cartData.products.length; // +1 porque los arrays empiezan en 0
        localStorage.setItem('cartCount', cartCount.toString());
      },
      (error: any) => {
        console.error('Error al obtener el carrito:', error); // Si no se pudo obtener el carrito
      }
    );
  }

  confirmCart(): Observable<boolean> { // Confirmar carrito
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post(this.url + 'cart/' + this.cartId + '/confirm/',
    {
      "confirm" : true,
      "client_id": parseInt(user.id)
    }).pipe(
      map((res: any) => {
        this.removeLocalStorageCart(); // Eliminar carrito de localStorage
        this.cartId = 0; // Reiniciar ID de carrito
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  private removeLocalStorageCart(): void { // Eliminar carrito de localStorage
    localStorage.removeItem('cartId'); // Eliminar ID de carrito de localStorage
    localStorage.removeItem('cartCount'); // Eliminar cantidad de productos de localStorage
  }

  private createCart(data: number): Observable<number> { // Crear carrito
    let cart: Observable<any>;
    if (data > 0) { // Si hay usuario
      cart = this.http.post(this.url + 'cart/', { client: data });
    } else { // Si no hay usuario
      cart = this.http.post(this.url + 'cart/', {});
    }
    return cart.pipe(
      map((res: any) => {
        if (res && res.id) { // Si se pudo obtener el ID del carrito
          this.updateLocalStorageCart(); // Actualizar carrito en localStorage
          return res.id;
        } else { // Si no se pudo obtener el ID del carrito
          throw new Error('No se pudo obtener el ID del carrito');
        }
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  private createCartDetails(articleId: number): Observable<boolean> {
    const cartDetailsData = {
      cart: this.cartId,
      item: articleId,
      quantity: 1,
    };

    return this.http.post(this.url + 'cartdetails/', cartDetailsData).pipe(
      map((res: any) => {
        this.updateLocalStorageCart();
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

}
