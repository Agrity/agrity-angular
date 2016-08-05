import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Config, HttpClient, Logger } from '../../../shared/index';
import { TraderBid } from './index';

import { HandlerSeller } from '../../handler-seller/shared/index';

@Injectable()
export class TraderBidService {
  private traderBidsUrl: string;
  private traderBatchUrl: string;

  constructor(
      private http: HttpClient,
      private config: Config,
      private logger: Logger
      ) {
    this.traderBidsUrl = this.config.getServerDomain() + '/trader/traderBids';
    this.traderBatchUrl = this.config.getServerDomain() + '/trader/batch';
  }

  public getTraderBids(): Observable<TraderBid[]> {
    return this.http.get(this.traderBidsUrl)
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

  public createTraderBids(traderBids: TraderBid[]): Observable<TraderBid[]> {
    if (traderBids == null) {
      this.logger.handleError('Attempted to add null TraderBid.');
      return null;
    }

    let traderJson: Object[] = [];

    for (let traderBid of traderBids) {
      traderJson.push(traderBid.encode());
    }

    return this.http.jsonPost(this.traderBatchUrl, '[' + traderJson.toString() + ']')
        .map(res => res.json())
        .catch(this.logger.handleHttpError);
  }

  public closeTraderBid(bidId: number) {
    if (bidId == null) {
      this.logger.handleError('Attempted to close null Bid');
      return null;
    }

    return this.http.get(this.traderBidsUrl + '/' + bidId + '/close')
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  public addHandlers(bidId: number, handlers: HandlerSeller[]) {
    if (handlers == null) {
      this.logger.handleError('Attempted to add null handlers.');
      return null;
    }

    if (bidId == null) {
      this.logger.handleError('Bid Id is null.');
      return null;
    }

    let handlerJson: Object[] = [];

    for (let handlerSeller of handlers) {
      handlerJson.push(handlerSeller.encode());
    }
    return this.http.jsonPost(this.traderBidsUrl + '/' + bidId +
        '/addHandlerSellers', '[' + handlerJson.toString() + ']');
  }

  public approve(bidId: number, handlerId: number) {
    if (handlerId == null) {
      this.logger.handleError('Handler Id is null');
      return null;
    }

    if (bidId == null) {
      this.logger.handleError('Bid Id is null.');
      return null;
    }

    return this.http.get(this.config.getServerDomain() +
        '/traderBids' + bidId + '/approve/' + handlerId);
  }

  public reject(bidId: number, handlerId: number) {
    if (handlerId == null) {
      this.logger.handleError('Handler Id is null');
      return null;
    }

    if (bidId == null) {
      this.logger.handleError('Bid Id is null.');
      return null;
    }

    return this.http.get(this.traderBidsUrl + '/' + bidId + '/disapprove/' + handlerId);
  }

  private getTraderBidUrl(traderBidId: number) {
    return this.traderBidsUrl + '/' + traderBidId;
  }

  private getHandlerSellerBidsUrl(handlerId: number) {
    return this.config.getServerDomain() + '/trader/handlerSellers/' + handlerId + '/traderBids';
  }
}
