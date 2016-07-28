import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Config, Logger, UserType }
    from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';

import { HandlerSeller, HandlerSellerService } from '../../handler-seller/shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/trader/handler-seller/handler-create/handler-create.component.css'],
  templateUrl: 'app/trader/handler-seller/handler-create/handler-create.component.html',
})

export class HandlerSellerCreateComponent implements OnInit {

  private handlerSeller: HandlerSeller = new HandlerSeller();

  constructor(
      private handlerSellerService: HandlerSellerService,
      private config: Config,
      private logger: Logger,
      private router: Router,
      private navBarService: NavBarService
      ) {}

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      alert('Please log out as a handler to access the trader side of Agrity!');
      this.router.navigateByUrl('/handler-home');
      return;
    }
  }

  /* NOTE: Called in .html file. */
  protected save() {
  this.handlerSellerService.addHandlerSeller(this.handlerSeller)
      .subscribe(
      x => {
        this.handlerSeller = HandlerSeller.decode(x);
        this.router.navigateByUrl('/handler-sellers');
      },
      error => {
        this.logger.handleHttpError(error);
      });
  }
}
