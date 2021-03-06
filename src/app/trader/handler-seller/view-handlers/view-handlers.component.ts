import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute }
    from '@angular/router';

import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { HandlerSeller, HandlerSellerService } from '../shared/index';
import { ViewHandlersDetailsComponent }
    from './view-handlers-details/index';
import { ViewHandlersSidebarComponent }
    from './view-handlers-sidebar/index';

import { Subscription } from 'rxjs/Subscription';

@Component({
  directives: [ROUTER_DIRECTIVES,
               ViewHandlersDetailsComponent,
               ViewHandlersSidebarComponent],
  styleUrls: ['assets/stylesheets/style.css',
              'app/trader/handler-seller/view-handlers/view-handlers.component.css'],
  templateUrl: 'app/trader/handler-seller/view-handlers/view-handlers.component.html',
})

export class ViewHandlersComponent implements OnInit, OnDestroy {

  private handlerSellers: HandlerSeller[];
  private selectedHandler: HandlerSeller;
  private sub: Subscription;
  private passedHandlerId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private handlerSellerService: HandlerSellerService,
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      this.logger.alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.logger.alert('Please log out as a handler to access the trader side of Agrity!');
      this.router.navigateByUrl('/handler-home');
      return;
    }

    this.sub = this.route.params
        .subscribe(params => {
          /* Disabling no-string for accessing query params. */
          /* tslint:disable:no-string-literal */
          this.passedHandlerId = +params['id'];
          /* tslint:enable:no-string-literal */

          // Load Growers
          this.handlerSellers = [];
          this.handlerSellerService.getHandlerSellers()
            .subscribe(
              handlers => {
                this.handlerSellers = handlers;
                for (let handlerIndex in this.handlerSellers) {
                  if ((this.handlerSellers[handlerIndex]).handlerId === this.passedHandlerId) {
                    this.selectedHandler = this.handlerSellers[handlerIndex];
                  }
                }
              },
              error => {
                    if (error.status === 401) {
                      this.logger.alert('An authorization error has occured.' +
                          'Please log out and try again.');
                      this.router.navigateByUrl('/trader-login');
                    } else {
                      this.logger.handleHttpError(error);
                  }
              });
        });
  }

  public ngOnDestroy() {
    if (this.sub) {
    this.sub.unsubscribe();
    }
  }

  /* NOTE: Referenced in .html file. */
  public onSelect(handler: HandlerSeller) {
    this.selectedHandler = handler;
  }

}
