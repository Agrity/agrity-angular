import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {provide} from '@angular/core';

import { AppComponent } from './app.component';
import { Config, HttpClient, Logger } from './shared/index';
import { NavBarComponent } from './shared/navbar/index';
import { GrowerService } from './growers/shared/index';
import { HandlerLoginService } from './handlers/handler-login/index';
import { HandlerService } from './handlers/shared/index';
import { BidService } from './bids/shared/index';

bootstrap(AppComponent,
          [/* Angular Providers */
           ROUTER_PROVIDERS,
           HTTP_PROVIDERS,

           /* Shared Providers */
           Config,
           HttpClient,
           Logger,
           NavBarComponent,

           /* Handler Providers */
           HandlerLoginService,

           /* Grower Providers */
           GrowerService,

           /* Bid Providers */
           BidService
          ]);
