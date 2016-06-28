import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private _http: Http) {} 

  createAuthorizationHeader(headers:Headers) {
    headers.append('X-ADMIN-TOKEN', localStorage.getItem('X-ADMIN-TOKEN')); 
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.post(url, data, {
      headers: headers
    });
  }
  
  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.put(url, data, {
      headers: headers
    });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.delete(url, {
      headers: headers
    });
  }
}
