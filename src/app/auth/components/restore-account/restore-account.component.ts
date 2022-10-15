import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restore-account',
  templateUrl: './restore-account.component.html',
  styleUrls: ['./restore-account.component.scss']
})
export class RestoreAccountComponent implements OnInit {
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      phone: [null, [Validators.required]],
      code: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  restore(form: FormGroup){

  }
  getCode(phone: string){
    if(phone)
      console.log(phone.replace(/\-/g,''));
  }


}
