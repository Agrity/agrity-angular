import { Component, OnInit  } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { HandlerSeller, HandlerSellerService } from '../shared/index';
import { ViewHandlersDetailsComponent }
    from './view-handlers-details/index';
import { ViewHandlersSidebarComponent }
    from './view-handlers-sidebar/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES,
               ViewHandlersDetailsComponent,
               ViewHandlersSidebarComponent],
  styleUrls: ['assets/stylesheets/style.css',
              'app/trader/handler-seller/view-handlers/view-handlers.component.css'],
  templateUrl: 'app/trader/handler-seller/view-handlers/view-handlers.component.html',
})

export class ViewHandlersComponent implements OnInit {

  private handlerSellers: HandlerSeller[];
  private selectedHandler: HandlerSeller;

  constructor(
    private router: Router,
    private handlerSellerService: HandlerSellerService,
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      alert('Please log back in as a trader to access the trader side of Agrity!');
      this.navBarService.onHandlerLoggedIn(false);
      this.config.forceLogout();
    }

    // Load Growers
    this.handlerSellers = [];
    this.handlerSellerService.getHandlerSellers()
      .subscribe(
        handlers => { this.handlerSellers = handlers;
        },
        error => {
          this.logger.handleHttpError(error);
        });

  }

  /* NOTE: Referenced in .html file. */
  public onSelect(handler: HandlerSeller) {
    this.selectedHandler = handler;
  }

}
