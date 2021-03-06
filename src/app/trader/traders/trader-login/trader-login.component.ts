import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';
import { Location } from '@angular/common';

import { Config, UserType, Logger } from '../../../shared/index';
import { LoginInfo } from './login-info';
import { TraderLoginService } from './trader-login.service';

import { NavBarService } from '../../../shared/main-navbar/index';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    styleUrls: ['app/trader/traders/trader-login/trader-login.component.css'],
    templateUrl: 'app/trader/traders/trader-login/trader-login.component.html',
})

export class TraderLoginComponent implements OnInit {

  /* NOTE: Referenced in .html file. */
  protected loginInfo = new LoginInfo('', '');

  private authTokenKey: string = 'auth_token';

  constructor(private traderLoginService: TraderLoginService,
              private config: Config,
              private logger: Logger,
              private router: Router,
              private location: Location,
              private navBarService: NavBarService) {};

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.logger.alert('Please log out as a handler to access the trader side of Agrity!');
      this.router.navigateByUrl('/handler-home');
      return;
    }

  }

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
          if (error.status === 401) {
            this.logger.alert('Invalid Username or Password.');
          } else {
            this.logger.alert('Server Error: Unable to Log In.');
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
          this.logger.alert('Successfully Logged Out');
          this.router.navigateByUrl('/');
        },
        error => {
          this.navBarService.onTraderLoggedIn(false);
          this.logger.alert('Successfully Logged Out');
          this.config.forceLogout();
        });
  }
}
