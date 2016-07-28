import { Component, OnInit } from '@angular/core';
import { RouterLink, ROUTER_DIRECTIVES, Router }
    from '@angular/router-deprecated';

import { Handler, HandlerService } from '../../handlers/index';
import { Config, Logger } from '../../../shared/index';

@Component({
    directives: [RouterLink, ROUTER_DIRECTIVES],
    providers: [HandlerService],
    selector: 'sg-navbar',
    styleUrls: ['app/handler/shared/navbar/navbar.component.css'],
    templateUrl: 'app/handler/shared/navbar/navbar.component.html',
})

export class NavBarComponent implements OnInit {

  private handler: Handler = new Handler();

  constructor(
    private router: Router,
    private handlerService: HandlerService,
    private logger: Logger,
    private config: Config) {
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
}
