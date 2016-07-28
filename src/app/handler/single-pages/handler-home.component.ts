import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Logger, Config, UserType } from '../../shared/index';
import { NavBarService } from '../../shared/main-navbar/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/handler/single-pages/handler-home.component.css'],
  templateUrl: 'app/handler/single-pages/handler-home.component.html',
})

export class HandlerHomeComponent implements OnInit  {

  constructor(
     private logger: Logger,
     private config: Config,
     private navBarService: NavBarService,
     private router: Router
  ) {}

  public ngOnInit() {
    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      alert('Please log out as a trader to access the handler side of Agrity!');
      this.router.navigateByUrl('/trader-home');
      return;
    }
  }
}
