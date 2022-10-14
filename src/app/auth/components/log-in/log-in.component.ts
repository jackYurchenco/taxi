import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';

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
    this._httpService.post(`${this._apiService.host}/${environment.api.account}`, {
      login: 'achumak',
      password: '4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a'
    }).subscribe((data)=>{
      console.log(data)
    })
  }

}
