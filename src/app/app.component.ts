import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { User } from './core/interfaces';
import { setUser } from './core/store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private _translateService: TranslateService,
    private _cookieService: CookieService,
    private _store: Store<{ user: User }>
  ){
    this._translateService.setDefaultLang('ua');
    let user: User | undefined = this.getCookie('user');
    if (user) {
      this.setUser(user)
    }
  }

  setUser(user: User){
    this._store.dispatch(setUser({
      payload: user
    }))
  }

  getCookie(key: string){
    let cookie = this._cookieService.get(key);
    if(cookie)
      return JSON.parse(cookie);
    return;
  }
}