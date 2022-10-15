import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces';
import { getUser } from '../../shared/store/user/user.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  constructor(
    private _store: Store<{ user: User }>
  ) { 
    this.user$ = this._store.select((state) => state.user)
  }

  ngOnInit(): void {
    this.user$.subscribe((user: User)=>{
      console.log(user) 
    })

    this.getUser('achumak', '1')

    
  }

  ngOnDestroy(): void {
    
  }

  getUser(login: string, password: string) {
    this._store.dispatch(getUser({  
      payload: {
        login,
        password
      }
    }))
  }

}
