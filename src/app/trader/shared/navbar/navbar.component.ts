import { Component, OnInit } from '@angular/core';
import { RouterLink, ROUTER_DIRECTIVES, Router }
    from '@angular/router-deprecated';

import { Trader, TraderService } from '../../traders/shared/index';
import { Config, Logger } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';

@Component({
    directives: [RouterLink, ROUTER_DIRECTIVES],
    providers: [TraderService],
    selector: 'sg-trader-navbar',
    styleUrls: ['app/trader/shared/navbar/navbar.component.css'],
    templateUrl: 'app/trader/shared/navbar/navbar.component.html',
})

export class TraderNavBarComponent implements OnInit {

  private trader: Trader = new Trader();

  constructor(
    private router: Router,
    private traderService: TraderService,
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
                alert('An authorization error has occured. Please log out and try again.');
                this.router.navigateByUrl('/trader-login');
              } else {
                this.logger.handleHttpError(error);
            }
          });
  }
}
