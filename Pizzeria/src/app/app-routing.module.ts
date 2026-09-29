import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrderPizzaComponent } from './pages/order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './pages/build-pizza/build-pizza.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:'order-pizza',
    component:OrderPizzaComponent
  },
  {
    path:"build-pizza",
    component:BuildPizzaComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
