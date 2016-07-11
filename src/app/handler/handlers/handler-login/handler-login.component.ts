import { Component } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { Location } from '@angular/common';

import { Config } from '../../shared/index';
import { LoginInfo } from './login-info';
import { HandlerLoginService } from './handler-login.service';

@Component({
    directives: [RouterLink, ROUTER_DIRECTIVES],
    providers: [],
    styleUrls: ['app/handler/handlers/handler-login/handler-login.component.css'],
    templateUrl: 'app/handler/handlers/handler-login/handler-login.component.html',
})

export class HandlerLoginComponent {

  /* NOTE: Referenced in .html file. */
  protected loginInfo = new LoginInfo('', '');

  private authTokenKey: string = 'auth_token';

  constructor(private handlerLoginService: HandlerLoginService,
              private config: Config,
              private router: Router,
              private location: Location) {};

  /* NOTE: Referenced in .html file. */
  protected login() {
    this.handlerLoginService.login(this.loginInfo)
      .subscribe(
        valid => {
          this.handlerLoginService
              .storeHandlerAuthToken(valid[this.authTokenKey]);
          this.router.navigateByUrl('/');
        },
        error => {
          if (error.indexOf('401') >= 0) {
            alert('Invalid Username or Password.');
          } else {
            alert('Server Error: Unable to Log In.');
          }
        });
  }

  /* NOTE: Referenced in .html file. */
  protected logout() {
    this.handlerLoginService.logout()
      .subscribe(
        valid => {
          this.handlerLoginService.eraseHandlerAuthToken();
          alert('Successfully Logged Out: Please Refresh the Page.');
        },
        error => {
          this.config.forceLogout();
        });
  }
}
