import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from './config.service';
import { UserType } from './index';

@Injectable()
export class HttpClient {

  constructor(private http: Http, private config: Config) {}

  public get(url: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers,
    });
  }

  public jsonPost(url: string, data: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    this.appendJsonFormatHeader(headers);
    return this.http.post(url, data, {
      headers: headers,
    });
  }

  public post(url: string, data: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers,
    });
  }

  public put(url: string, data: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    this.appendJsonFormatHeader(headers);
    return this.http.put(url, data, {
      headers: headers,
    });
  }

  public delete(url: string) {
    let headers = new Headers();
    this.appendAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers,
    });
  }

  private appendAuthorizationHeader(headers: Headers) {
    // this.logger.info(
    //    'Auth-Token: '
    //    + localStorage.getItem(this._config.getHandlerAuthHeaderKey()));
    switch (this.config.loggedIn()) {
      case UserType.HANDLER:
        headers
        .append(this.config.getHandlerAuthHeaderKey(),
                localStorage.getItem(this.config.getHandlerAuthHeaderKey()));
        break;
      case UserType.TRADER:
        headers
        .append(this.config.getTraderAuthHeaderKey(),
                localStorage.getItem(this.config.getTraderAuthHeaderKey()));
        break;
      default:
        break;
    }
  }

  private appendJsonFormatHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }
}
