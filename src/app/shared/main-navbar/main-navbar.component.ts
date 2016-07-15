import { Component, OnInit } from '@angular/core';
import { Config, Logger, UserType } from '../index';
import { NavBarComponent } from '../../handler/shared/navbar/index';
import { TraderNavBarComponent } from '../../trader/shared/navbar/index';

// DO NOT IMPORT THIS FROM INDEX! CAUSES A HELLISH BUG!
import { NavBarService } from './main-navbar.service';

@Component({
    directives: [
        TraderNavBarComponent,
        NavBarComponent,
        ],
    providers: [ NavBarService ],
    selector: 'sg-main-navbar',
    styleUrls: ['app/shared/main-navbar/main-navbar.component.css'],
    templateUrl: 'app/shared/main-navbar/main-navbar.component.html',
})

export class MainNavBarComponent implements OnInit {

  private traderLoggedIn: boolean = false;
  private handlerLoggedIn: boolean = false;

  constructor(
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {}

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.handlerLoggedIn = true;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      this.traderLoggedIn = true;
    }

    this.navBarService.traderLoggedIn
        .subscribe(
            res => {
              this.traderLoggedIn = res;
            },
            error => {
              this.logger.handleHttpError(error);
              this.config.forceTraderLogout();
            }
          );

    this.navBarService.handlerLoggedIn
        .subscribe(
            res => {
              this.handlerLoggedIn = true;
            },
            error => {
              this.logger.handleHttpError(error);
              this.config.forceTraderLogout();
            }
          );
  }
}
