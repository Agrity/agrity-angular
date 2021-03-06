import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Config, HttpClient, Logger } from '../../../shared/index';
import { LoginInfo } from './login-info';

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

  public login(loginInfo: LoginInfo) {
    let loginInfoObject = { 'email_address': loginInfo.emailAddress,
                            'password': loginInfo.password };
    return this.http.jsonPost(this.loginUrl, JSON.stringify(loginInfoObject))
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  public logout() {
    return this.http.post(this.logoutUrl, /* No Data */ '')
      .catch(this.logger.handleHttpError);
  }

  public storeHandlerAuthToken(token: string) {
    localStorage.setItem(this.config.getHandlerAuthHeaderKey(), token);
  }

  public eraseHandlerAuthToken() {
    localStorage.setItem(this.config.getHandlerAuthHeaderKey(), '');
  }
}
