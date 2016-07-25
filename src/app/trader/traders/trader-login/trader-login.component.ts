import { Component } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { Location } from '@angular/common';

import { Config } from '../../../shared/index';
import { LoginInfo } from './login-info';
import { TraderLoginService } from './trader-login.service';

import { NavBarService } from '../../../shared/main-navbar/index';

@Component({
    directives: [RouterLink, ROUTER_DIRECTIVES],
    providers: [],
    styleUrls: ['app/trader/traders/trader-login/trader-login.component.css'],
    templateUrl: 'app/trader/traders/trader-login/trader-login.component.html',
})

export class TraderLoginComponent {

  /* NOTE: Referenced in .html file. */
  protected loginInfo = new LoginInfo('', '');

  private authTokenKey: string = 'auth_token';

  constructor(private traderLoginService: TraderLoginService,
              private config: Config,
              private router: Router,
              private location: Location,
              private navBarService: NavBarService) {};

  /* NOTE: Referenced in .html file. */
  protected login() {
    this.traderLoginService.login(this.loginInfo)
      .subscribe(
        valid => {
          this.traderLoginService
              .storeTraderAuthToken(valid[this.authTokenKey]);
          this.navBarService.onTraderLoggedIn(true);
          this.router.navigateByUrl('/trader-home');
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
    this.traderLoginService.logout()
      .subscribe(
        valid => {
          this.traderLoginService.eraseTraderAuthToken();
          this.navBarService.onTraderLoggedIn(false);
          alert('Successfully Logged Out: Please Refresh the Page.');
        },
        error => {
          this.config.forceTraderLogout();
        });
  }
}
