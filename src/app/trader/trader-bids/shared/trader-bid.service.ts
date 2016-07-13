import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Config, HttpClient, Logger } from '../../shared/index';
import { TraderBid } from './index';
import { TraderBidData } from './index';

@Injectable()
export class TraderBidService {
  private traderBidsUrl: string;

  constructor(
      private http: HttpClient,
      private config: Config,
      private logger: Logger
      ) {
    this.traderBidsUrl = null; // config.getServerDomain() + '/handler/offers';
  }

  public getTraderBids(): Observable<TraderBid[]> {
    return Observable.of(TraderBidData.mockTraderBids);

    /*
    this.http.get(this.traderBidsUrl)
      .map(res => res.json())
      .map(bidsJson => {
        let traderBids: TraderBid[] = [];
        for (let bidIndex in traderBidsJson) {
          traderBids.push(TraderBid.decode(traderBidsJson[bidIndex]));
        }
        return traderBids;
      })
      .catch(this.logger.handleHttpError);
    */
  }

  public getTraderBid(traderBidId: number): Observable<TraderBid> {
    return this.http.get(this.getTraderBidUrl(traderBidId))
      .map(res => res.json())
      .map(json => TraderBid.decode(json))
      .catch(this.logger.handleHttpError);
  }

  public getHandlerSellerBids(handlerSellerId: number): Observable<TraderBid[]> {
    return this.http.get(this.getHandlerSellerBidsUrl(handlerSellerId))
      .map(res => res.json())
      .map(traderBidsJson => {
        let traderBids: TraderBid[] = [];
        for (let bidIndex in traderBidsJson) {
          traderBids.push(TraderBid.decode(traderBidsJson[bidIndex]));
        }
        return traderBids;
      })
      .catch(this.logger.handleHttpError);
  }

  public createBid(traderBid: TraderBid) {
    if (traderBid == null) {
      this.logger.handleError('Attempted to add null TraderBid.');
      return null;
    }

    return this.http.jsonPost(this.traderBidsUrl, traderBid.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  private getTraderBidUrl(traderBidId: number) {
    return this.traderBidsUrl + '/' + traderBidId;
  }

  private getHandlerSellerBidsUrl(growerId: number) {
    return this.config.getServerDomain();
        // TODO: Fix this.
        // + '/handler/growers/' + growerId + '/offers';
  }
}
