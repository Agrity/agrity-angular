import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Logger } from '../shared/logger.service';
import { HttpClient } from '../shared/http-client.service'
import {Config} from '../config/Config';
import {LoginInfo} from './login-info';

@Injectable()
export class HandlerLoginService {

  private loginUrl: string;
  private logoutUrl: string;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {

    this.loginUrl = config.getServerDomain() + '/handler/login';
    this.logoutUrl = config.getServerDomain() + '/handler/logout';
  }

  login(loginInfo: LoginInfo) {
    var loginInfoObject = { "emailaddress": loginInfo.emailAddress,
                            "password": loginInfo.password };
    return this.http.jsonPost(this.loginUrl, JSON.stringify(loginInfoObject))
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  logout() {
    return this.http.post(this.logoutUrl, /* No Data */ "")
      .catch(this.logger.handleHttpError);
  }
    
  storeHandlerAuthToken(token: string) {
    localStorage.setItem(this.config.getHandlerAuthHeaderKey(), token);
  }

  eraseHandlerAuthToken() {
    localStorage.setItem(this.config.getHandlerAuthHeaderKey(), "");
  }
}
