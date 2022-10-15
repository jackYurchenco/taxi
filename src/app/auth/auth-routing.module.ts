/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RestoreAccountComponent } from './components/restore-account/restore-account.component';
import { AuthNavigation } from './shared/constants';

const routes: Routes = [
  {
    path: ``,
    component: AuthComponent,
    children: [
      {
        path: ``,
        component: LogInComponent
      },
      {
        path: AuthNavigation.Register,
        component: RegisterAccountComponent
      },
      {
        path: AuthNavigation.Restore,
        component: RestoreAccountComponent
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
