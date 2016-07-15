import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Config, HttpClient, Logger } from '../../../shared/index';
import { Trader } from './index';

@Injectable()
export class TraderService {
  private tradersUrl: string;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {
    this.tradersUrl = config.getServerDomain() + '/trader';
  }

  public getCurrentTrader() {
    return this.http.get(this.tradersUrl)
      .map(res => res.json())
      .map(res => Trader.decode(res))
      .catch(this.logger.handleHttpError);
  }

}
