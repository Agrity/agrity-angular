import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Config, HttpClient, Logger } from '../../../shared/index';
import { LoginInfo } from './login-info';

@Injectable()
export class TraderLoginService {

  private loginUrl: string;
  private logoutUrl: string;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {

    this.loginUrl = config.getServerDomain() + '/trader/login';
    this.logoutUrl = config.getServerDomain() + '/trader/logout';
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

  public storeTraderAuthToken(token: string) {
    localStorage.setItem(this.config.getTraderAuthHeaderKey(), token);
  }

  public eraseTraderAuthToken() {
    localStorage.setItem(this.config.getTraderAuthHeaderKey(), '');
  }
}
