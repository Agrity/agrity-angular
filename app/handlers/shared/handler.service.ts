import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Config, HttpClient, Logger } from '../../shared/index';
import { Handler } from './index';

@Injectable()
export class HandlerService {
  private handlersUrl: string;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {
    this.handlersUrl = config.getServerDomain() + '/handler';
  }

  getCurrentHandler() {
    return this.http.get(this.handlersUrl)
      .map(res => res.json())
      .map(res => Handler.decode(res))
      .catch(this.logger.handleHttpError);
  }

}
