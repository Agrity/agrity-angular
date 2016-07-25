import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { UserType, Logger } from './index';

// DO NOT IMPORT THIS FROM INDEX! CAUSES A HELLISH BUG!
import { NavBarService } from './main-navbar/main-navbar.service';

@Injectable()
export class Config implements OnInit {

  private CONFIG_FOLDER: string = 'config/';
  private GLOBAL_CONFIG_FILE: string = 'global.json';

  private LOCAL_CONFIG_KEY: string = 'env';

  private globalConfig: Object;
  private localConfig: Object;

  constructor(
    private http: Http,
    private router: Router,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {
    // Okay to Not Use HTTP Client Here. Fetching from local server.
    this.http.get(this.CONFIG_FOLDER + this.GLOBAL_CONFIG_FILE)
        .map(res => res.json())
        .subscribe((globalConfig: Object) => {

          this.globalConfig = globalConfig;
          console.log(this.globalConfig);

          //// Get Local Environment Configs
          //this.http.get(this.CONFIG_FOLDER + globalConfig[this.LOCAL_CONFIG_KEY] + '.json')
          //    .map(res => res.json())
          //    // TODO Thow error invalid Environment!
          //    .subscribe( (localConfig) => {
          //      this.localConfig = localConfig;
          //      console.log(this.localConfig);
          //    });
        }, (error) => {
          console.error(error);
        });
  }

  public getConfig(key: string): string {
    //let localVal = this.localConfig[key];
    //if (localVal !== undefined && localVal !== null) {
    //  return localVal;
    //}

    return this.globalConfig[key];
  }

  public getServerDomain(): string {
    return this.getConfig('endpoint');
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
    this.navBarService.onTraderLoggedIn(false);
    this.navBarService.onHandlerLoggedIn(false);
    this.router.navigateByUrl('/handler-login');
  }

  public forceTraderLogout() {
    localStorage.setItem(this.getTraderAuthHeaderKey(), '');
    localStorage.setItem(this.getHandlerAuthHeaderKey(), '');
    this.navBarService.onTraderLoggedIn(false);
    this.navBarService.onHandlerLoggedIn(false);
    this.router.navigateByUrl('/trader-login');
  }
}
