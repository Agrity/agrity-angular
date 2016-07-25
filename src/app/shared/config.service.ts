import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { UserType } from './index';

// DO NOT IMPORT THIS FROM INDEX! CAUSES A HELLISH BUG!
import { NavBarService } from './main-navbar/main-navbar.service';

@Injectable()
export class Config {

  constructor(
    private router: Router,
    private navBarService: NavBarService
    ) {}

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

      console.error('TRADER AND HANDLER LOGGED IN! FORCING LOGOUT');
      this.forceLogout();
      return UserType.NONE;
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
    this.router.navigateByUrl('/');
  }

  public clearTokens() {
    localStorage.setItem(this.getHandlerAuthHeaderKey(), '');
    localStorage.setItem(this.getTraderAuthHeaderKey(), '');
  }
}
