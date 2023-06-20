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
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    },{Validators: this.passwordIguales('password1', 'password2')});
  }





  get password2NoValido() {
    return this.forma.get('password2')?.invalid && this.forma.get('password2')?.touched;
  }


  crearFormulario() {

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    }, {
      Validators: this.passwordIguales('password1', 'password2')
    }
    )
  }

  guardar() {

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched()
      })
    }

    const passwordNoValido = this.passNovalido();
    if (passwordNoValido) {
      this.forma.get('password2')?.setErrors({ noEsIgual: true });
    }
  }

  passNovalido() {

    const pass1 = this.forma.get('password1')?.value;
    const pass2 = this.forma.get('password2')?.value;

    if (pass1 !== pass2) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
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