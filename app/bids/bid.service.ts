import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient } from '../shared/http-client.service';
import { Logger } from '../shared/logger.service';
import {Config} from '../config/Config';
import {Bid} from './bid';

@Injectable()
export class BidService {
	private bidsUrl;

	constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {
    this.bidsUrl = config.getServerDomain() + '/handler/offers';
	}

  getBids() {
    return this.http.get(this.bidsUrl)
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  getBid(bidId: number) {
    return this.http.get(this.getBidUrl(bidId))
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  getGrowerBids(growerId: number) {
    return this.http.get(this.getGrowerBidsUrl(growerId))
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  createBid(bid: Bid) {
    if (bid == null) {
      this.logger.handleError("Attempted to add null Bid.");
      return null;
    }

    return this.http.jsonPost(this.bidsUrl, bid.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  private getBidUrl(bidId: number){
    return this.bidsUrl + "/" + bidId;
  }

  private getGrowerBidsUrl(growerId: number) {
    return this.config.getServerDomain()
        + "/handler/growers/" + growerId + "/offers";
  }
}
