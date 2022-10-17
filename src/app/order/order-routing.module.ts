/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  {
    path: ``,
    component: OrderComponent,
    children: [
      
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class OrderRoutingModule {}
