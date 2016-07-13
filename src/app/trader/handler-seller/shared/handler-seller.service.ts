import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config, HttpClient, Logger } from '../../shared/index';

import { HandlerSeller } from './index';

@Injectable()
export class HandlerSellerService {
  private handlerSellersUrl: string;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {
    this.handlerSellersUrl = null; // this.config.getServerDomain() + '/handler/growers';
  }

  public getHandlerSellers(): Observable<HandlerSeller[]> {
    return this.http.get(this.handlerSellersUrl)
      .map(res => res.json())
      .map(handlerSellersJson => {
        let handlers: HandlerSeller[] = [];
        for (let idx in handlerSellersJson) {
          handlers.push(HandlerSeller.decode(handlerSellersJson[idx]));
        }
        return handlers;
      })
      .catch(this.logger.handleHttpError);
  }

  public getHandlerSeller(handlerSellerId: number): Observable<HandlerSeller> {
    if (handlerSellerId == null) {
      this.logger.handleError('Attempted to get Grower with null id.');
      return null;
    }

    return this.http.get(this.getHandlerSellerUrl(handlerSellerId))
      .map(res => res.json())
      .map(res => HandlerSeller.decode(res))
      .catch(this.logger.handleHttpError);
  }

  public addHandlerSeller(handlerSeller: HandlerSeller) {
    if (handlerSeller == null) {
      this.logger.handleError('Attempted to add null Grower.');
      return null;
    }

    return this.http.jsonPost(this.handlerSellersUrl, handlerSeller.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  // TODO Updating Not Implemented on Server Side Yet.
  // updateUser(user){
  // return this.http.put(this.getUserUrl(user.id), JSON.stringify(user))
  //    .map(res => res.json());
  // }

  // TODO Deleteing Not Implemented on Server Side Yet.
  public deleteHandlerSeller(handlerSellerId: number) {
    return Observable.throw('Deleting Growers Not Yet Implemented.');
  }

  private getHandlerSellerUrl(handlerSellerId: number ) {
    return this.handlerSellersUrl + '/' + handlerSellerId;
  }
}
