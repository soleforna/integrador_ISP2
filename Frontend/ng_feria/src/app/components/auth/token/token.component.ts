import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})


export class TokenComponent{

  password:any;
  email:any;
  tokenError: boolean = false;


constructor( public userService: UsersService,public router:Router ) {
   
}

  enviarToken(){
    this.userService.enviarToken(this.email, this.password)
    .subscribe(response => {
     console.log(response);
     this.router.navigate(["/inicio"]); // Redirecciona a token.
     }, error => {
        this.tokenError = true;
     });

  }

}
