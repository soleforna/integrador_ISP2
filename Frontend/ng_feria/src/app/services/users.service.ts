
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}


  login(user: any) {
    return this.http.post("http://localhost:8000/api/auth/login/", {
      email: user.email,
      password: user.password
    });
  }

 // register(formData: any) {
    //return this.http.post("http://localhost:8000/api/auth/register/", {

    //});
  //}
  register(first_name: string, last_name: string, username: string, email: string, password: string, phone: string, address: string): Observable<any> {
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);

    return this.http.post('http://localhost:8000/api/clients/', formData);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return this.http.post("http://localhost:8000/api/auth/logout/", {'Authorization: Token ': localStorage.getItem("token")});
  }

  // Obtiene el usuario y lo guarda en el localStorage.
  getUser() {
    const tk = localStorage.getItem("token");

    if (tk) { // Si existe un token en el localStorage, entonces lo envía en el header de la petición.
      const headers = new HttpHeaders({
        'Authorization': 'Token ' + tk,
        'Content-type': 'application/json'
      });

      this.http.get("http://localhost:8000/api/auth/user/", { headers }).subscribe(
        (res: any) => {
          localStorage.setItem("user", JSON.stringify(res)); // Guarda el usuario en el localStorage.
        }, (err: any) => {
          return err;
        });
      return true;

    }else{
      // El token no está disponible en el localStorage. Realiza alguna acción adicional o muestra un mensaje de error.
      return false;
    }
  }

}




