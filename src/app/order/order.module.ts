/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// module
import { OrderRoutingModule } from './order-routing.module';
// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../core/directives/directives.module';
import { OrderComponent } from './components/order/order.component';
import { ComponentsModule } from '../core/components/components.module';


@NgModule({
  imports: [
    OrderRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    //custom
    DirectivesModule,
    ComponentsModule,

    // primeng
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    PasswordModule,
    InputMaskModule,
    TooltipModule,


    TranslateModule.forChild(),
    //StoreModule.forFeature(`user`, user.reducer),
    //EffectsModule.forFeature([])
  ],
  declarations: [
    OrderComponent
  ],
  providers: [
	]
})
export class OrderModule {}
