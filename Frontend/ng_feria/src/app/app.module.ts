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
import { FormsModule } from '@angular/forms';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule //importe el módulo de formularios
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
