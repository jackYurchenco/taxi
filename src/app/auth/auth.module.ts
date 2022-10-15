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
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthComponent } from './components/auth/auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RestoreAccountComponent } from './components/restore-account/restore-account.component';
import { UserEffects } from './shared/store/user/user.effects';
import * as user from './shared/store/user/user.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../core/directives/directives.module';
import { LogInNavigationComponent } from './components/log-in/log-in-navigation/log-in-navigation.component';
import { RegisterAccountNavigationComponent } from './components/register-account/register-account-navigation/register-account-navigation.component';
import { RestoreAccountNavigationComponent } from './components/restore-account/restore-account-navigation/restore-account-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    //custom
    DirectivesModule,

    // primeng
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    PasswordModule,
    InputMaskModule,
    TooltipModule,


    TranslateModule.forChild(),
    //ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: `never` }),
    StoreModule.forFeature(`user`, user.reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    AuthComponent,
    LogInComponent,
    RegisterAccountComponent,
    RestoreAccountComponent,
    LogInNavigationComponent,
    RegisterAccountNavigationComponent,
    RestoreAccountNavigationComponent
  ],
  providers: [
	]
})
export class AuthModule {}
