import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {HttpClient} from '../HttpClient';

@Injectable()
export class UserService {
	private _url = "http://localhost:9000/admin/offers";

	constructor(private _http: HttpClient){
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
    // TODO Change back to actual functionality. Used for testing purposes
    // currently.
		return this._http.get(this._url)
			.map(res => res.json());
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
