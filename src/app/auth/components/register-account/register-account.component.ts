import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
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
    console.log(form.value)
  }

  getCode(phone: string){
    console.log(phone.replace(/\-/g,''));
  }

}
