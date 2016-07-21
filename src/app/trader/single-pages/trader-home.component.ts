import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Logger, Config, UserType } from '../../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/trader/single-pages/trader-home.component.css'],
  templateUrl: 'app/trader/single-pages/trader-home.component.html',
})

export class TraderHomeComponent implements OnInit  {

  constructor(
     private logger: Logger,
     private config: Config
  ) {}

  public ngOnInit() {
    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceTraderLogout();
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      alert('Handlers cannot access the trader side of agrity. Please login as a trader.');
      this.config.forceTraderLogout();
    }
  }
}
