import { Component, OnInit } from '@angular/core';
import { RouterLink, ROUTER_DIRECTIVES, Router }
    from '@angular/router-deprecated';

import { Trader, TraderService } from '../../traders/shared/index';
import { Config, Logger, UserType } from '../../../shared/index';

@Component({
    directives: [RouterLink, ROUTER_DIRECTIVES],
    providers: [TraderService],
    selector: 'sg-trader-navbar',
    styleUrls: ['app/handler/shared/navbar/navbar.component.css'],
    templateUrl: 'app/handler/shared/navbar/navbar.component.html',
})

export class TraderNavBarComponent implements OnInit {

  private trader: Trader = new Trader();

  constructor(
    private router: Router,
    private traderService: TraderService,
    private logger: Logger,
    private config: Config) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      this.config.forceLogout();
      return;
    }

    this.traderService.getCurrentTrader()
        .subscribe(
            trader => {
              this.trader = trader;
            },
            error => {
              this.logger.handleHttpError(error);
              this.config.forceLogout();
          });
  }
}
