import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreNavigation } from './core/constants/core-navigation'
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: '',   redirectTo: CoreNavigation.Auth , pathMatch: 'full' },
  {
    loadChildren: () => import(`./auth/auth.module`).then((module) => module.AuthModule),
    path: CoreNavigation.Auth
  },
  {
    loadChildren: () => import(`./order/order.module`).then((module) => module.OrderModule),
    path: CoreNavigation.Order,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
