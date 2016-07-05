import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {HttpClient} from '../shared/http-client.service';
import { Logger } from '../shared/logger.service';
import {Config} from '../shared/config.service';
import {Handler} from './handler';

@Injectable()
export class HandlerService {
  private handlersUrl;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {
    this.handlersUrl = config.getServerDomain() + '/handler';
  }

  getCurrentHandler() {
    return this.http.get(this.handlersUrl)
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

}
