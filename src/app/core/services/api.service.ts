import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: `root`
})
export class ApiService {
  private _configUrl: string;
  private _configSettings: any;
  constructor(private http: HttpClient) {
    this._configUrl = `assets/api/api.config.json`;
    this._configSettings = null;
  }

  get settings() {
    return this._configSettings;
  }

  get host() {
    return this._configSettings.host;
  }

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this._configUrl).subscribe((response: any) => {
        this._configSettings = response;
        resolve(true);
      });
    });
  }
}
