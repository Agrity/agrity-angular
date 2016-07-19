import { Component, Input } from '@angular/core';
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

export class MainNavBarComponent {

  private recievedTraderBool: boolean = false;
  private recievedHandlerBool: boolean = false;

  @Input()
  set traderLoggedIn(traderLoggedIn: boolean) {
    this.recievedTraderBool = traderLoggedIn;
  }

  @Input()
  set handlerLoggedIn(handlerLoggedIn: boolean) {
    this.recievedHandlerBool = handlerLoggedIn;
  }
}
