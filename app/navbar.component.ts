import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';

import {Config} from './config/Config'
import {Observable} from 'rxjs/Observable';
import {HandlerService} from './handler/handler.service';
import {Handler} from './handler/handler';
import {ErrorHandling} from './ErrorHandling';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    providers: [HandlerService], 
    directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class NavBarComponent implements OnInit {

	private handler: Handler = new Handler();  

  constructor(
    	private _router: Router,
    	private _handlerService: HandlerService,  
      private _errorHandling: ErrorHandling,
      private _config: Config) {
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      this._config.forceLogout();
      return;   
    }

    this._handlerService.getCurrentHandler()
        .subscribe(
            handler => {
              this.handler = Handler.decode(handler);
            },
          error => {
            this._errorHandling.handleHttpError(error);
            this._config.forceLogout();
          });
  }

  isCurrentRoute(route){
      var instruction = this._router.generate(route);
      return this._router.isRouteActive(instruction);
    }
}
