import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router }
    from '@angular/router';

import { Handler, HandlerService } from '../../handlers/index';
import { Config, Logger } from '../../../shared/index';

import { HandlerLoginService } from '../../handlers/handler-login/handler-login.service';
import { NavBarService } from '../../../shared/main-navbar/index';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [HandlerService],
    selector: 'sg-navbar',
    styleUrls: ['app/handler/shared/navbar/navbar.component.css'],
    templateUrl: 'app/handler/shared/navbar/navbar.component.html',
})

export class NavBarComponent implements OnInit {

  private handler: Handler = new Handler();

  constructor(
    private handlerLoginService: HandlerLoginService,
    private router: Router,
    private handlerService: HandlerService,
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {

    this.handlerService.getCurrentHandler()
        .subscribe(
            handler => {
              this.handler = handler;
            },
            error => {
              if (error.status === 401) {
                alert('An authorization error has occured. Please log out and try again.');
                this.router.navigateByUrl('/handler-login');
              } else {
                this.logger.handleHttpError(error);
            }
          });
  }

  /* NOTE: Referenced in .html file. */
  protected logout() {
    this.handlerLoginService.logout()
      .subscribe(
        valid => {
          this.handlerLoginService.eraseHandlerAuthToken();
          this.navBarService.onHandlerLoggedIn(false);
          alert('Successfully Logged Out');
          this.router.navigateByUrl('/');
        },
        error => {
          this.navBarService.onHandlerLoggedIn(false);
          alert('Successfully Logged Out');
          this.config.forceLogout();
        });
  }
}
