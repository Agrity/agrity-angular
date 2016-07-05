import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';

import {Config} from './config/Config'
import {Observable} from 'rxjs/Observable';
import {HandlerService} from './handler/handler.service';
import {Handler} from './handler/handler';
import { Logger } from './shared/logger.service';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    providers: [HandlerService], 
    directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class NavBarComponent implements OnInit {

	private handler: Handler = new Handler();  

  constructor(
    	private router: Router,
    	private handlerService: HandlerService,  
      private logger : Logger,
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

  isCurrentRoute(route){
      var instruction = this.router.generate(route);
      return this.router.isRouteActive(instruction);
    }
}
