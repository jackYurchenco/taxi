import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from './core/classes';


const routes: Routes = [
  {
    loadChildren: () => import(`./auth/auth.module`).then((module) => module.AuthModule),
    path: Navigation.auth
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
