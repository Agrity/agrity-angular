import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterLink, ROUTER_DIRECTIVES, RouteConfig, Router }
    from '@angular/router-deprecated';

import { Handler, HandlerService } from '../../handlers/index'
import { Config, Logger } from '../index'

@Component({
    selector: 'navbar',
    templateUrl: 'app/shared/navbar/navbar.component.html',
    providers: [HandlerService], 
    directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class NavBarComponent implements OnInit {

	private handler: Handler = new Handler();  

  constructor(
    private router: Router,
    private handlerService: HandlerService,  
    private logger: Logger,
    private config: Config) {
  }

  ngOnInit(){

    if (!this.config.loggedIn()) {
      this.config.forceLogout();
      return;   
    }

    this.handlerService.getCurrentHandler()
        .subscribe(
            handler => {
              this.handler = Handler.decode(handler);
            },
          error => {
            this.logger.handleHttpError(error);
            this.config.forceLogout();
          });
  }
}
