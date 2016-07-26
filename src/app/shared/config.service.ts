import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { UserType } from './index';

// DO NOT IMPORT THIS FROM INDEX! CAUSES A HELLISH BUG!
import { NavBarService } from './main-navbar/main-navbar.service';

// Loads Raw JSON to variable
import configJSON from '../../config/config.json!json';

@Injectable()
export class Config {

  private LOCAL_CONFIG_KEY: string = 'env';

  constructor(
    private http: Http,
    private router: Router,
    private navBarService: NavBarService) {

      if (!this.isDefined(configJSON)) {
        throw new Error('Config JSON could not be found.');
      }

      if (!this.isDefined(configJSON[this.LOCAL_CONFIG_KEY])) {
        throw new Error('Config Key ( ' + this.LOCAL_CONFIG_KEY + ' ) could not be found');
      }

      let localEnv: string = this.getEnvironmentKey();

      if (!this.isDefined(configJSON[localEnv])) {
        throw new Error('Config Environment ( ' + localEnv + ' ) could not be found.');
      }

      // Using raw console.log because of circular dependency.
      /* tslint:disable:no-console */
      if (this.isDebug()) {

        console.debug('');

        // Log current global configurations in non-prod environments
        console.debug('Global Config:');
        for (let key in configJSON) {
          console.debug(key + ': ' + configJSON[key]);
        }

        console.debug('');

        // Log current local configurations in non-prod environments
        console.debug('Local Config ( ' + localEnv + ' ):');
        for (let key in configJSON[localEnv]) {
          console.debug(key + ': ' + configJSON[localEnv][key]);
        }

        // Whitespace seperation.
        console.debug('');
      }
      /* tslint:enable:no-console */
  }

  public getServerDomain(): string {
    let SERVER_DOMAIN_KEY = 'endpoint';

    let endpoint: string = this.getConfig(SERVER_DOMAIN_KEY);
    this.verifyPresent(SERVER_DOMAIN_KEY, endpoint);

    return endpoint;
  }

  public getHandlerAuthHeaderKey(): string {
    let HANDLER_TOKEN_KEY = 'handler-key';

    let handlerToken: string = this.getConfig(HANDLER_TOKEN_KEY);
    this.verifyPresent(HANDLER_TOKEN_KEY, handlerToken);

    return handlerToken;
  }

  public getTraderAuthHeaderKey(): string {
    let TRADER_TOKEN_KEY = 'trader-key';

    let traderToken: string = this.getConfig(TRADER_TOKEN_KEY);
    this.verifyPresent(TRADER_TOKEN_KEY, traderToken);

    return traderToken;
  }

  public isDebug(): boolean {
    let debugBool: boolean = this.getConfig('debug');
    return debugBool !== undefined || debugBool !== null
      ? debugBool
      : false;
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

  /* tslint:disable:no-any */
  private getConfig(key: string): any {
    let localConfig: Object = configJSON[this.getEnvironmentKey()];

    let localVal = localConfig[key];
    if (localVal !== undefined && localVal !== null) {
      return localVal;
    }

    return configJSON[key];
  }
  /* tslint:enable:no-any */

  private getEnvironmentKey(): string {
    return configJSON[this.LOCAL_CONFIG_KEY];
  }

  /* tslint:disable:no-any */
  private isDefined(value: any) {
    return value !== null && value !== undefined;
  }
  /* tslint:enable:no-any */

  /* tslint:disable:no-any */
  private verifyPresent(key: string, value: any) {
    if (!this.isDefined(value)) {
      throw new Error('Expected Config Value ( ' + key + ' ) not found.');
    }
  }
  /* tslint:enable:no-any */

}
