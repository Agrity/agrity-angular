import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';

import { Config, HttpClient, Logger } from '../../../shared/index';

@Injectable()
export class ManualTraderBidResponseService {
  private traderBidsUrl: string;

  constructor(
      private http: HttpClient,
      private config: Config,
      private logger: Logger
      ) {
    this.traderBidsUrl = config.getServerDomain() + '/traderBids';
  }

  public acceptBid(bidId: number, pounds: number, handlerId: number) {
    if (bidId == null) {
      this.logger.handleError('BidId is null.');
      return null;
    }

    if (handlerId == null) {
      this.logger.handleError('HandlerId is null.');
      return null;
    }

    if (pounds == null) {
      this.logger.handleError('Pounds is null');
    }

    return this.http.get(this.traderBidsUrl + '/' + bidId + '/accept/' + handlerId + '/' + pounds);
  }

  public rejectBid(bidId: number, handlerId: number) {
    if (bidId == null) {
      this.logger.handleError('BidId is null.');
      return null;
    }

    if (handlerId == null) {
      this.logger.handleError('HandlerId is null.');
      return null;
    }

    return this.http.get(this.traderBidsUrl + '/' + bidId + '/reject/' + handlerId);
  }
}
