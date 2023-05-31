import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { CheckoutCardComponent } from './components/shop/checkout-card/checkout-card.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { ProductsContainerComponent } from './components/shop/products-container/products-container.component';
import { DetailsComponent } from './components/shop/details/details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenComponent } from './components/auth/token/token.component';
import { EnviarCorreoComponent } from './components/auth/enviarcorreo/enviarCorreo.component';
import { RegisterComponent } from './components/auth/register/register.component';
//import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio', component:LandingComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path:'tienda',component:ShopComponent},
  {path:'productos', component:ProductsComponent},
  {path: 'producto', component: ProductsContainerComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout-card', component: CheckoutCardComponent},
  {path:'detalle/:category/:id', component:DetailsComponent},
  {path: 'registro', component:RegisterComponent},
  {path: 'token', component:TokenComponent},
  {path: 'enviarCorreo', component:EnviarCorreoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
