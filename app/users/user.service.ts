import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx'; // TODO Remove and Replace with Necassary Functions.
import {HttpClient} from '../HttpClient';
import {ErrorHandling} from '../ErrorHandling';

@Injectable()
export class UserService {
  private _url = "http://localhost:9000/handler/growers";

  constructor(private _http: HttpClient,
              private _errorHandling: ErrorHandling){
  }

  getUsers(){
    return this._http.get(this._url)
      .map(res => res.json());
  }
    
  getUser(userId){
    return this._http.get(this.getUserUrl(userId))
      .map(res => res.json());
  }
    
  addUser(user){
    if (user == null) {
      this._errorHandling.handleError("Attempted to add null Grower.");
      return null;
    }

    return this._http.jsonPost(this._url, user.encode())
      .map(res => res.json())
      .catch(this._errorHandling.handleHttpError);
  }
    
  updateUser(user){
    return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
      .map(res => res.json());
  }
    
  deleteUser(userId){
    return this._http.delete(this.getUserUrl(userId))
      .map(res => res.json());
  }
    
  private getUserUrl(userId){
    return this._url + "/" + userId;
  }
}
