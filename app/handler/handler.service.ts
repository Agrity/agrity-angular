import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {HttpClient} from '../HttpClient';
import {ErrorHandling} from '../ErrorHandling';
import {Config} from '../config/Config';
import {Handler} from './handler';

@Injectable()
export class HandlerService {
  private _handlersUrl;

  constructor(private _http: HttpClient,
              private _config: Config,
              private _errorHandling: ErrorHandling) {
    this._handlersUrl = _config.getServerDomain() + '/handler';
  }

  getCurrentHandler() {
    return this._http.get(this._handlersUrl)
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }

}