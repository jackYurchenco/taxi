import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreNavigation } from './core/constants/core-navigation'


const routes: Routes = [
  {
    loadChildren: () => import(`./auth/auth.module`).then((module) => module.AuthModule),
    path: CoreNavigation.Auth
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
