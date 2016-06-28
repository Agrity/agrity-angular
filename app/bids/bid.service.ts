import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {HttpClient} from '../HttpClient';
import {ErrorHandling} from '../ErrorHandling';
import {Config} from '../config/Config';
import {Bid} from './bid';

@Injectable()
export class BidService {
	private _bidUrl;

	constructor(private _http: HttpClient,
              private _config: Config,
              private _errorHandling: ErrorHandling) {
    this._bidUrl = _config.getServerDomain() + '/handler/offers';
	}

  getBids() {
  }

  getBid(bidId: number) {
  }

  createBid(bid: Bid) {
    if (bid == null) {
      this._errorHandling.handleError("Attempted to add null Bid.");
      return null;
    }

    return this._http.jsonPost(this._bidUrl, bid.encode())
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }
}
