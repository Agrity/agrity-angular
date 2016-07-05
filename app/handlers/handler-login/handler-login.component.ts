import {Component, OnInit, coreBootstrap} from '@angular/core';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Location} from '@angular/common';

import { Config } from '../../shared/index';
import { LoginInfo } from './login-info';
import { HandlerLoginService } from './handler-login.service';

@Component({
    templateUrl: 'app/handlers/handler-login/handler-login.component.html',
    styleUrls: ['assets/stylesheets/style.css'],
    providers: [],
    directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class HandlerLoginComponent {

  private authTokenKey: string = "auth_token";

  constructor(private handlerLoginService: HandlerLoginService,
              private config: Config,
              private router: Router,
              private location: Location) {};

  loginInfo = new LoginInfo('', '');

  private login() {
    this.handlerLoginService.login(this.loginInfo)
      .subscribe(
        valid => {
          console.log("Valid: " + valid[this.authTokenKey]);
          this.handlerLoginService
              .storeHandlerAuthToken(valid[this.authTokenKey]);
          this.router.navigateByUrl('/');
        },
        error => {
          if (error.indexOf('401') >= 0){
            alert("Invalid Username or Password.");
          } else {
            alert("Server Error: Unable to Log In.");
          }
          console.log("Error: " + error);
        });
  }

  private logout() {
    this.handlerLoginService.logout()
      .subscribe(
        valid => {
          console.log("Valid: Logged Out");
          this.handlerLoginService.eraseHandlerAuthToken();
          alert("Successfully Logged Out: Please Refresh the Page.");
        },
        error => {
          console.log("Error: " + error)
          this.config.forceLogout();
        });
  }
}
