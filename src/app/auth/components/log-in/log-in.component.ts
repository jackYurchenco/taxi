import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subscription } from 'rxjs';
import { User } from '../../shared/interfaces';
import { getUser } from '../../shared/store/user/user.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user$: Observable<User>;
  form: FormGroup;
  constructor(
    private _store: Store<{ user: User }>,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) {
    this.subscription = new Subscription();
    this.user$ = this._store.select((state) => state.user);

    this.form = this._formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this._route.queryParams.pipe(
        filter((params: any) => params.phone),
        map((obj: { phone: string }) => obj.phone)
      ).subscribe((phone)=>{
        this.form.patchValue({
          login: phone
       });
      })
    )
    

    this.subscription.add(
      this.user$.subscribe((user: User)=>{
        console.log(user) 
      })
    )   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  auth(form: FormGroup) {
    this.getUser(form.value.login, form.value.password)
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
