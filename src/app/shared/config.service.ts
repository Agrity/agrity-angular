import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { UserType } from './index';

@Injectable()
export class Config {

  constructor(
    private router: Router) {
  }
  public getServerDomain(): string {
    return 'http://localhost:9000';
  }

  public getHandlerAuthHeaderKey(): string {
    return 'X-HANDLER-TOKEN';
  }

  public getTraderAuthHeaderKey(): string {
    return 'X-TRADER-TOKEN';
  }

  // TODO Move to Appropriate Location
  public loggedIn(): UserType {

    if (
        !(localStorage.getItem(this.getHandlerAuthHeaderKey()) === '' ||
        localStorage.getItem(this.getHandlerAuthHeaderKey()) === null) &&

        !(localStorage.getItem(this.getTraderAuthHeaderKey()) === '' ||
         localStorage.getItem(this.getTraderAuthHeaderKey()) === null)
    ) {

      throw new Error('TRADER AND HANDLER LOGGED IN!');
    }

    if (
        (localStorage.getItem(this.getHandlerAuthHeaderKey()) === '' ||
        localStorage.getItem(this.getHandlerAuthHeaderKey()) === null) &&

        (localStorage.getItem(this.getTraderAuthHeaderKey()) === '' ||
        localStorage.getItem(this.getTraderAuthHeaderKey()) === null)
    ) {

      return UserType.NONE;
    }

    if (localStorage.getItem(this.getHandlerAuthHeaderKey()) === '' ||
        localStorage.getItem(this.getHandlerAuthHeaderKey()) === null) {

      return UserType.TRADER;
    }

    if (localStorage.getItem(this.getTraderAuthHeaderKey()) === '' ||
        localStorage.getItem(this.getTraderAuthHeaderKey()) === null) {

      return UserType.HANDLER;
    }
  }

  public forceLogout() {
    localStorage.setItem(this.getHandlerAuthHeaderKey(), '');
    localStorage.setItem(this.getTraderAuthHeaderKey(), '');
    this.router.navigateByUrl('/handler-login');
  }

  public forceTraderLogout() {
    localStorage.setItem(this.getTraderAuthHeaderKey(), '');
    localStorage.setItem(this.getHandlerAuthHeaderKey(), '');
    this.router.navigateByUrl('/trader-login');
  }
}
