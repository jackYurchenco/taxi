/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {
    path: ``,
    component: NotFoundComponent,
    children: [
      
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class NotFoundRoutingModule {}
