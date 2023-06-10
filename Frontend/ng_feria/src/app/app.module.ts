import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { ProductsContainerComponent } from './components/shop/products-container/products-container.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { CheckoutCardComponent } from './components/shop/checkout-card/checkout-card.component';
import { DetailsComponent } from './components/shop/details/details.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenComponent } from './components/auth/token/token.component';
import { EnviarCorreoComponent } from './components/auth/enviarcorreo/enviarCorreo.component';
import { FechaService } from './services/fecha.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FooterComponent,
    NavComponent,
    ProductsComponent,
    ProductsContainerComponent,
    CheckoutComponent,
    CheckoutCardComponent,
    DetailsComponent,
    ShopComponent,
    LoginComponent,
    RegisterComponent,
    TokenComponent,
    EnviarCorreoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //importe el módulo de formularios
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [FechaService], //agregue el servicio de Fecha a los providers
  bootstrap: [AppComponent]
})
export class AppModule { }
