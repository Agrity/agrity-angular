import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Config, Logger, UserType }
    from '../../../shared/index';

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
      private router: Router
      ) {}

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.'
          + 'If this issue continues try logging out, then logging back in.');
      this.config.forceTraderLogout();
      return;
    }
  }

  /* NOTE: Called in .html file. */
  protected save() {
  this.handlerSellerService.addHandlerSeller(this.handlerSeller).subscribe(x => {
      this.handlerSeller = HandlerSeller.decode(x);
      this.router.navigateByUrl('/handlerSellers');
    });
  }
}
