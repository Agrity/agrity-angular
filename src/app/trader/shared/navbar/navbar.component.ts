import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router }
    from '@angular/router';

import { Trader, TraderService } from '../../traders/shared/index';
import { Config, Logger } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';

import { TraderLoginService } from '../../traders/trader-login/trader-login.service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [TraderService, TraderLoginService],
    selector: 'sg-trader-navbar',
    styleUrls: ['app/trader/shared/navbar/navbar.component.css'],
    templateUrl: 'app/trader/shared/navbar/navbar.component.html',
})

export class TraderNavBarComponent implements OnInit {

  private trader: Trader = new Trader();

  constructor(
    private router: Router,
    private traderService: TraderService,
    private traderLoginService: TraderLoginService,
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {

    this.traderService.getCurrentTrader()
        .subscribe(
            trader => {
              this.trader = trader;
            },
            error => {
              if (error.status === 401) {
                this.logger.alert('An authorization error has occured. ' +
                'Please log out and try again.');
                this.router.navigateByUrl('/trader-login');
              } else {
                this.logger.handleHttpError(error);
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
