
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


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

  register(user: any) {
    return this.http.post("http://localhost:8000/api/auth/register/", {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password1: user.password1,
      password2: user.password2,
    });
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




