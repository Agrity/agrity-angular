import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config, HttpClient, Logger } from '../../../shared/index';
import { Grower } from './index';

@Injectable()
export class GrowerService {
  private growersUrl: string;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger) {
    this.growersUrl = this.config.getServerDomain() + '/handler/growers';
  }

  public getGrowers(): Observable<Grower[]> {
    return this.http.get(this.growersUrl)
      .map(res => res.json())
      .map(growersJson => {
        let growers: Grower[] = [];
        for (let idx in growersJson) {
          growers.push(Grower.decode(growersJson[idx]));
        }
        return growers;
      })
      .catch(this.logger.handleHttpError);
  }

  public getGrower(growerId: number): Observable<Grower> {
    if (growerId == null) {
      this.logger.handleError('Attempted to get Grower with null id.');
      return null;
    }

    return this.http.get(this.getGrowerUrl(growerId))
      .map(res => res.json())
      .map(res => Grower.decode(res))
      .catch(this.logger.handleHttpError);
  }

  public addGrower(grower: Grower) {
    if (grower == null) {
      this.logger.handleError('Attempted to add null Grower.');
      return null;
    }

    return this.http.jsonPost(this.growersUrl, grower.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }

  public editGrower(grower: Grower) {
    if (grower == null) {
      this.logger.handleError('Attempted to edit with null Grower.');
      return null;
    }
  return this.http.jsonPut(this.getGrowerUrl(grower.growerId), grower.encode())
     .map(res => res.json())
     .catch(this.logger.handleHttpError);
  }

  // TODO Deleteing Not Implemented on Server Side Yet.
  public deleteGrower(growerId: number) {
    return Observable.throw('Deleting Growers Not Yet Implemented.');
  }

  private getGrowerUrl(growerId: number ) {
    return this.growersUrl + '/' + growerId;
  }
}
