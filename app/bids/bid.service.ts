import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {HttpClient} from '../HttpClient';
import {ErrorHandling} from '../ErrorHandling';
import {Config} from '../config/Config';
import {Bid} from './bid';

@Injectable()
export class BidService {
	private _bidsUrl;

	constructor(private _http: HttpClient,
              private _config: Config,
              private _errorHandling: ErrorHandling) {
    this._bidsUrl = _config.getServerDomain() + '/handler/offers';
	}

  getBids() {
    return this._http.get(this._bidsUrl)
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }

  getBid(bidId: number) {
    return this._http.get(this.getBidUrl(bidId))
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }

  createBid(bid: Bid) {
    if (bid == null) {
      this._errorHandling.handleError("Attempted to add null Bid.");
      return null;
    }

    return this._http.jsonPost(this._bidsUrl, bid.encode())
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }

  private getBidUrl(bidId: number){
    return this._bidsUrl + "/" + bidId;
  }
}
