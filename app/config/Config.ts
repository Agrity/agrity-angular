import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Injectable()
export class Config {
  constructor(
    private _router: Router) {
  }
  public getServerDomain(): string {
    return 'http://localhost:9000';
  }

  public getHandlerAuthHeaderKey(): string {
    return 'X-HANDLER-TOKEN';
  }

  // TODO Move to Appropriate Location
  public loggedIn(): boolean {
    if (localStorage.getItem(this.getHandlerAuthHeaderKey()) == "") {
      return false;
    }
    return true; 
  }

  public forceLogout() {
    localStorage.setItem(this.getHandlerAuthHeaderKey(), "");
    this._router.navigateByUrl('/handler-login');
  }
}
