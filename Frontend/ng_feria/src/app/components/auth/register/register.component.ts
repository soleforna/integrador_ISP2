import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  forma!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  get nombreNoValido() {

    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  get apellidoNoValido() {

    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }

  get correoNoValido() {

    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  get password1NoValido() {

    return this.forma.get('password1')?.invalid && this.forma.get('password1')?.touched;
  }

  get password2NoValido() {

    return this.forma.get('password2')?.invalid && this.forma.get('password2')?.touched;
  }



  crearFormulario() {

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]

    }, {

      Validators: this.passwordIguales('password1', 'password2')
    }
    )
  }

  guardar() {
    console.log(this.forma);


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

}

