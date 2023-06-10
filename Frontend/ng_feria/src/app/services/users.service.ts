import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(this.apiUrl+"auth/login/", {
      email: user.email,
      password: user.password,
    });
  }

  register(first_name: string, last_name: string,  email: string, password: string, phone: string, address: string): Observable<any> {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    console.log(formData);
    return this.http.post(this.apiUrl + 'clients/', formData);
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return this.http.post(this.apiUrl+"auth/logout/", {'Authorization: Token ': localStorage.getItem("token")});
  }

  // Obtiene el usuario y lo guarda en el localStorage.
  getUser() {
    const tk = localStorage.getItem("token");
    let user = {}
    if (tk) { // Si existe un token en el localStorage, entonces lo envía en el header de la petición.
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + tk,
        'Content-type': 'application/json'
      });

      this.http.get(this.apiUrl+"clients/auth/", { headers }).subscribe(
        (res: any) => {
          user = res;
          localStorage.setItem("user", JSON.stringify(user));
        },
        (error) => {
          if (error.status == 401) { // Si el token no es válido, entonces lo elimina del localStorage.
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      );
        return true;
    }else{
      // El token no está disponible en el localStorage. Realiza alguna acción adicional o muestra un mensaje de error.
      return false;
    }
  }

  /* Actualizo los datos del usuario */
  actualizarUsuario(datos: any): Observable<any> {

    const url = `http://localhost:8000/api/auth/user/${datos.pk}`;
    const body = JSON.stringify(datos);

    return this.http.patch(url, body).pipe(
      catchError((error) => {
        // Manejo de errores
        throw error;
      })
    );
  }
}
