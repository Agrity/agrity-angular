import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';

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
    return '';
  }

  // TODO Move to Appropriate Location
  public loggedIn(): boolean {
    if (localStorage.getItem(this.getHandlerAuthHeaderKey()) === '') {
      return false;
    }
    return true;
  }

  public forceLogout() {
    localStorage.setItem(this.getHandlerAuthHeaderKey(), '');
    this.router.navigateByUrl('/handler-login');
  }
}
