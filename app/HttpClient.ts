import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Config} from './config/Config';

@Injectable()
export class HttpClient {

  constructor(private _http: Http, private _config: Config) {} 

  private appendAuthorizationHeader(headers: Headers) {
    console.log("Auth-Token: " + localStorage.getItem(this._config.getHandlerAuthHeaderKey()));
    headers
        .append(this._config.getHandlerAuthHeaderKey(),
                localStorage.getItem(this._config.getHandlerAuthHeaderKey())); 
  }

  private appendJsonFormatHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }

  get(url: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    return this._http.get(url, {
      headers: headers
    });
  }

  jsonPost(url: string, data: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    this.appendJsonFormatHeader(headers);
    return this._http.post(url, data, {
      headers: headers
    });
  }

  post(url: string, data: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    return this._http.post(url, data, {
      headers: headers
    });
  }
  
  put(url: string, data: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    this.appendJsonFormatHeader(headers);
    return this._http.put(url, data, {
      headers: headers
    });
  }

  delete(url: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    return this._http.delete(url, {
      headers: headers
    });
  }
}
