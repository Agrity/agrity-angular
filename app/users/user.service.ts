import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx'; // TODO Remove and Replace with Necassary Functions.
import {HttpClient} from '../HttpClient';
import {ErrorHandling} from '../ErrorHandling';
import {Config} from '../config/Config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  private _growersUrl;

  constructor(private _http: HttpClient,
              private _config: Config,
              private _errorHandling: ErrorHandling){
    this._growersUrl = this._config.getServerDomain() + "/handler/growers";
  }

  getUsers(){
    return this._http.get(this._growersUrl)
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }
    
  getUser(userId: number){
    if (userId == null) {
      this._errorHandling.handleError("Attempted to Grower with null id.");
      return null;
    }

    return this._http.get(this.getUserUrl(userId))
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }
    
  addUser(user){
    if (user == null) {
      this._errorHandling.handleError("Attempted to add null Grower.");
      return null;
    }

    return this._http.jsonPost(this._growersUrl, user.encode())
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
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
