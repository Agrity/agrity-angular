import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config, HttpClient, Logger } from '../../shared/index';

@Injectable()
export class GrowerService {
  private growersUrl;

  constructor(private http: HttpClient,
              private config: Config,
              private logger: Logger){
    this.growersUrl = this.config.getServerDomain() + "/handler/growers";
  }

  getGrowers() {
    return this.http.get(this.growersUrl)
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }
    
  getGrower(growerId: number) {
    if (growerId == null) {
      this.logger.handleError("Attempted to Grower with null id.");
      return null;
    }

    return this.http.get(this.getGrowerUrl(growerId))
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }
    
  addGrower(grower) {
    if (grower == null) {
      this.logger.handleError("Attempted to add null Grower.");
      return null;
    }

    return this.http.jsonPost(this.growersUrl, grower.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }
    
  // TODO Updating Not Implemented on Server Side Yet.
  //updateUser(user){
  //  return this.http.put(this.getUserUrl(user.id), JSON.stringify(user))
  //    .map(res => res.json());
  //}
    
  // TODO Deleteing Not Implemented on Server Side Yet.
  deleteGrower(growerId: number) {
    return Observable.throw("Deleting Growers Not Yet Implemented.")
  }
    
  private getGrowerUrl(growerId) {
    return this.growersUrl + "/" + growerId;
  }
}
