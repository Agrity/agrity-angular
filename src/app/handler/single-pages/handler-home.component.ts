import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Logger, Config, UserType } from '../../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/handler/single-pages/handler-home.component.css'],
  templateUrl: 'app/handler/single-pages/handler-home.component.html',
})

export class HandlerHomeComponent implements OnInit  {

  constructor(
     private logger: Logger,
     private config: Config
  ) {}

  public ngOnInit() {
    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      alert('Traders cannot access the handler side of agrity. Please login as a handler.');
      this.config.forceLogout();
    }
  }
}
