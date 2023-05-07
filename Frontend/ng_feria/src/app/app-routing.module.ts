import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { ProductsComponent } from './components/shop/products/products.component';
import { ProductsContainerComponent } from './components/shop/products-container/products-container.component';
import { DetailsComponent } from './components/shop/details/details.component';
import { LoginComponent } from './components/auth/login/login.component';
//import { RegisterComponent } from './components/register/register.component';
//import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio', component:LandingComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path:'tienda',component:ShopComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'Productos', component: ProductsContainerComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path:'details', component:DetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
