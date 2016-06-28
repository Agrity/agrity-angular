import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {ErrorHandling} from '../ErrorHandling';
import {HttpClient} from '../HttpClient'
import {Config} from '../config/Config';
import {LoginInfo} from './login-info';

@Injectable()
export class HandlerLoginService {

  private _loginUrl: string;
  private _logoutUrl: string;

  constructor(private _http: HttpClient,
              private _config: Config,
              private _errorHandling: ErrorHandling) {

    this._loginUrl = _config.getServerDomain() + '/handler/login';
    this._logoutUrl = _config.getServerDomain() + '/handler/logout';
  }

  login(loginInfo: LoginInfo) {
    var loginInfoObject = { "email_address": loginInfo.emailAddress,
                            "password": loginInfo.password };
    return this._http.jsonPost(this._loginUrl, JSON.stringify(loginInfoObject))
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }

  logout() {
    return this._http.post(this._logoutUrl, /* No Data */ "")
      .catch(this._errorHandling.handleHttpError);
  }
    
  storeHandlerAuthToken(token: string) {
    localStorage.setItem(this._config.getHandlerAuthHeaderKey(), token);
  }

  eraseHandlerAuthToken() {
    localStorage.setItem(this._config.getHandlerAuthHeaderKey(), "");
  }
}
