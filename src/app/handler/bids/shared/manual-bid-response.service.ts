import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';

import { Config, HttpClient, Logger } from '../../../shared/index';

@Injectable()
export class ManualBidResponseService {
  private bidsUrl: string;

  constructor(
      private http: HttpClient,
      private config: Config,
      private logger: Logger
      ) {
    this.bidsUrl = config.getServerDomain() + '/handlerBids';
  }

  public acceptBid(bidId: number, pounds: number, growerId: number) {
    if (bidId == null) {
      this.logger.handleError('BidId is null.');
      return null;
    }

    if (growerId == null) {
      this.logger.handleError('GrowerId is null.');
      return null;
    }

    if (pounds == null) {
      this.logger.handleError('Pounds is null');
    }

    return this.http.get(this.bidsUrl + '/' + bidId + '/accept/' + growerId + '/' + pounds);
  }

  public rejectBid(bidId: number, growerId: number) {
    if (bidId == null) {
      this.logger.handleError('BidId is null.');
      return null;
    }

    if (growerId == null) {
      this.logger.handleError('GrowerId is null.');
      return null;
    }

    return this.http.get(this.bidsUrl + '/' + bidId + '/reject/' + growerId);
  }
}
