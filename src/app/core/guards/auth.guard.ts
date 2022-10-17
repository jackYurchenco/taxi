import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CoreNavigation } from '../constants/core-navigation';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user$: Observable<User>;
  constructor(
    private _store: Store<{ user: User }>,
    private _router: Router
  ) {
    this.user$ = this._store.select((state) => state.user);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(map((user: User) => {
      if(!user.token){
        this._router.navigate([CoreNavigation.Auth])
        return false;
      }
      return true;
    }));
  }
}

