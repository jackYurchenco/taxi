import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { sha512 } from 'sha512-crypt-ts';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    console.log(sha512.hex('1'))
    this._httpService.post(`${this._apiService.host}/${environment.api.account}`, {
      login: 'achumak',
      password: sha512.hex('1')
    }).subscribe((data)=>{
      console.log(data)
    })
  }

}
