import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { ProductsComponent } from './components/shop/products/products.component';

//import { LoginComponent } from './components/login/login.component';
//import { RegisterComponent } from './components/register/register.component';
//import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {path:'products', component:ProductsComponent,

},
{path:'checkout', component:CheckoutComponent,

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
