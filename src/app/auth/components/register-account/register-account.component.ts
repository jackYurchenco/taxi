import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser, sendCodeToPhoneForRegister } from '../../../core/store/user/user.actions';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store
  ) {
    this.form = this._formBuilder.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {
  }

  register(form: FormGroup) {
    this._store.dispatch(createUser({
      payload: form.value
    }))
  }

  sendCode(phone: string){
    if(phone) {
      this._store.dispatch(sendCodeToPhoneForRegister({
        payload: phone
      }))
    }  
  }

}
