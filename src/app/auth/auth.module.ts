/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// module
import { AuthRoutingModule } from './auth-routing.module';
// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthComponent } from './components/auth/auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RestoreAccountComponent } from './components/restore-account/restore-account.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    FormsModule,

    // primeng
    ButtonModule,
    InputTextModule,
    CheckboxModule,


    // TranslateModule.forChild(),
    // ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: `never` }),
    // StoreModule.forFeature(`auth`, auth.reducer),
    // EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    AuthComponent,
    LogInComponent,
    RegisterAccountComponent,
    RestoreAccountComponent
  ],
  providers: [
	]
})
export class AuthModule {}
