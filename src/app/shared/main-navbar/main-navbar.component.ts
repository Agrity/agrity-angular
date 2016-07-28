import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../../handler/shared/navbar/index';
import { TraderNavBarComponent } from '../../trader/shared/navbar/index';
import { RouterLink, ROUTER_DIRECTIVES, Router }
    from '@angular/router-deprecated';

@Component({
    directives: [
        TraderNavBarComponent,
        NavBarComponent,
        RouterLink,
        ROUTER_DIRECTIVES,
        ],
    selector: 'sg-main-navbar',
    styleUrls: ['app/shared/main-navbar/main-navbar.component.css'],
    templateUrl: 'app/shared/main-navbar/main-navbar.component.html',
})

export class MainNavBarComponent {

  private recievedTraderBool: boolean = false;
  private recievedHandlerBool: boolean = false;

  constructor(
      private router: Router
      ) {}

  @Input()
  set traderLoggedIn(traderLoggedIn: boolean) {
    this.recievedTraderBool = traderLoggedIn;
  }

  @Input()
  set handlerLoggedIn(handlerLoggedIn: boolean) {
    this.recievedHandlerBool = handlerLoggedIn;
  }
}
