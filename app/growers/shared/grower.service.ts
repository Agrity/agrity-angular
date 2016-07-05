import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx'; // TODO Remove and Replace with Necassary Functions.

import { Config, HttpClient, Logger } from '../../shared/index';

@Injectable()
export class GrowerService {
  private _growersUrl;

  constructor(private _http: HttpClient,
              private _config: Config,
              private logger: Logger){
    this._growersUrl = this._config.getServerDomain() + "/handler/growers";
  }

  getUsers(){
    return this._http.get(this._growersUrl)
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }
    
  getUser(userId: number){
    if (userId == null) {
      this.logger.handleError("Attempted to Grower with null id.");
      return null;
    }

    return this._http.get(this.getUserUrl(userId))
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }
    
  addUser(user){
    if (user == null) {
      this.logger.handleError("Attempted to add null Grower.");
      return null;
    }

    return this._http.jsonPost(this._growersUrl, user.encode())
      .map(res => res.json())
      .catch(this.logger.handleHttpError);
  }
    
  // TODO Updating Not Implemented on Server Side Yet.
  //updateUser(user){
  //  return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
  //    .map(res => res.json());
  //}
    
  // TODO Deleteing Not Implemented on Server Side Yet.
  deleteUser(userId: number){
    return Observable.throw("Deleting Users Not Yet Implemented.")
  }
    
  private getUserUrl(userId){
    return this._growersUrl + "/" + userId;
  }
}
