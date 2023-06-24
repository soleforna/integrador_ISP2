import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
declare const Swal: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  forma: FormGroup;
  loginError: boolean = false;
  public apiErrors: any = {};
  
  constructor(private fb: FormBuilder, public userService: UsersService, public router:Router) {
    this.forma = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: ['']
    });
  }

  register() {
    const { first_name, last_name, email, password, phone, address } = this.forma.value;

    this.userService.register(first_name, last_name, email, password, phone, address).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.apiErrors = error.error;
          console.log(this.apiErrors);
        }else {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Ha habido un error',
            showConfirmButton: false,
            timer: 1500
          });
        }
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/iniciar-sesion']); // Redirecciona a login.
        });
      }
    });
  }
}