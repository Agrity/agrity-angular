import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Config, HttpClient, Logger } from '../../../shared/index';

@Injectable()
export class ManualBidResponseService {
  private bidsUrl: string;

  constructor(
      private http: HttpClient,
      private config: Config,
      private logger: Logger
      ) {
    this.bidsUrl = config.getServerDomain() + '/handler/handlerBids';
  }

  public acceptBid(bidId: number, pounds: number, growerId: number) {
    // Do Nothing
  }

  public rejectBid(bidId: number, growerId: number) {
    // Do
  }
}