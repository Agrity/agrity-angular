import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


import {HttpClient} from '../HttpClient'
import {Config} from '../config/Config';
import {LoginInfo} from './login-info';

@Injectable()
export class HandlerLoginService {

  private _loginUrl: string;
  private _logoutUrl: string;

  constructor(private _http: HttpClient, private _config: Config) {
    this._loginUrl = _config.getServerDomain() + '/handler/login';
    this._logoutUrl = _config.getServerDomain() + '/handler/logout';
  }

  login(loginInfo: LoginInfo) {
    var loginInfoObject = { "email_address": loginInfo.emailAddress,
                            "password": loginInfo.password };
    return this._http.jsonPost(this._loginUrl, JSON.stringify(loginInfoObject))
      .map(res => res.json())
      .catch(this.handlerError);
  }

  logout() {
    return this._http.post(this._logoutUrl, /* No Data */ "")
      .catch(this.handlerError);
  }
    
  storeHandlerAuthToken(token: string) {
    localStorage.setItem(this._config.getHandlerAuthHeaderKey(), token);
  }

  eraseHandlerAuthToken() {
    localStorage.setItem(this._config.getHandlerAuthHeaderKey(), "");
  }

  // TODO fix returned error.
  private handlerError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
