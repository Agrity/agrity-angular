import {Component, OnInit, coreBootstrap} from '@angular/core';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {Config} from '../config/Config'

import {LoginInfo} from './login-info'
import {HandlerLoginService} from './handler-login.service'


@Component({
    templateUrl: 'app/handler-login/handler-login.component.html',
    styleUrls: ['assets/stylesheets/style.css'],
    providers: [],
    directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class HandlerLoginComponent {

  constructor(private _handlerLoginService: HandlerLoginService,
              private _config: Config,
              private _location: Location) {};

  loginInfo = new LoginInfo('', '');

  private login() {
    this._handlerLoginService.login(this.loginInfo)
      .subscribe(
        valid => {
          console.log("Valid: " + valid["auth_token"]);
          this._handlerLoginService.storeHandlerAuthToken(valid["auth_token"]);
        },
        error => console.log("Error: " + error));
  }

  private logout() {
    this._handlerLoginService.logout()
      .subscribe(
        valid => {
          console.log("Valid: Logged Out");
          this._handlerLoginService.eraseHandlerAuthToken();
          this._location.go('/');
        },
        error => console.log("Error: " + error));
  }
}
