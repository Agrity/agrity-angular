import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Config, HttpClient, Logger } from '../../../shared/index';
import { Bid } from './index';

@Injectable()
export class BidService {
  private bidsUrl: string;

  constructor(
      private http: HttpClient,
      private config: Config,
      private logger: Logger
      ) {
    this.bidsUrl = config.getServerDomain() + '/handler/offers';
  }

  public getBids(): Observable<Bid[]> {
    return this.http.get(this.bidsUrl)
      .map(res => res.json())
      .map(bidsJson => {
        let bids: Bid[] = [];
        for (let bidIndex in bidsJson) {
          bids.push(Bid.decode(bidsJson[bidIndex]));
        }
        return bids;
      })
      .catch(this.logger.handleHttpError);
  }

  public getBid(bidId: number): Observable<Bid> {
    return this.http.get(this.getBidUrl(bidId))
      .map(res => res.json())
      .map(json => Bid.decode(json))
      .catch(this.logger.handleHttpError);
  }

  public getGrowerBids(growerId: number): Observable<Bid[]> {
    return this.http.get(this.getGrowerBidsUrl(growerId))
      .map(res => res.json())
      .map(bidsJson => {
        let bids: Bid[] = [];
        for (let bidIndex in bidsJson) {
          bids.push(Bid.decode(bidsJson[bidIndex]));
        }
        return bids;
      })
      .catch(this.logger.handleHttpError);
  }

  public createBid(bid: Bid) {
    if (bid == null) {
      this.logger.handleError('Attempted to add null Bid.');
      return null;
    }

    return this.http.jsonPost(this.bidsUrl, bid.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  private getBidUrl(bidId: number) {
    return this.bidsUrl + '/' + bidId;
  }

  private getGrowerBidsUrl(growerId: number) {
    return this.config.getServerDomain()
        + '/handler/growers/' + growerId + '/offers';
  }
}
