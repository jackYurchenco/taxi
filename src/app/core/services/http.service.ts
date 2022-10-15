import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders, 
  HttpParams
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  private _httpHeaders(token: string = '', localization: string = 'uk-ua') {
		return new HttpHeaders({
			'Accept-Language': localization,
			'Authorization': `Basic ${token}`,
			'Cache-Control': `no-cache`,
			'Content-Type': `application/json`,
      'X-WO-API-APP-ID': 'YEI'
		});
	}

  get(url: string) {
    return this._http.get(url, {
			headers: this._httpHeaders()
		});
  }


  post(url: string, body: Object = {}) {
    return this._http.post(url, body, {
			headers: this._httpHeaders()
		});
  }
}
