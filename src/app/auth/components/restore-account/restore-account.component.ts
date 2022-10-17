import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { checkCodeForRestore, restoreUserPassword, sendCodeToPhoneForRestore } from '../../../core/store/user/user.actions';
import { UserTypes } from '../../../core/store/user/user.types';

@Component({
  selector: 'app-restore-account',
  templateUrl: './restore-account.component.html',
  styleUrls: ['./restore-account.component.scss']
})
export class RestoreAccountComponent implements OnInit {
  form: FormGroup;
  isVerifieCode: boolean;
  subscription: Subscription;
  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _actions$: Actions,
  ) {
    this.subscription = new Subscription();
    this.form = this._formBuilder.group({
      phone: [null, [Validators.required]],
      code: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
    this.isVerifieCode = false;
  }

  ngOnInit(): void {
    this.subscription.add(
      this._actions$
      .pipe(ofType(UserTypes.CheckCodeForRestoreSuccess))
      .subscribe(() => {
        this.isVerifieCode = true;
      })
    );
  }

  restore(form: FormGroup){
    this._store.dispatch(restoreUserPassword({
      payload: form.value
    }))
  }
  sendCode(phone: string){
    if(phone) {
      this._store.dispatch(sendCodeToPhoneForRestore({
        payload: phone
      }))
    } 
  }
  checkCode(phone: string, code: string) {
    if(phone && code) {
      this._store.dispatch(checkCodeForRestore({
        payload: {
          phone,
          code
        }
      }))
    }
  }
}
