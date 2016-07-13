import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app/app.component';
import { Config, HttpClient, Logger } from './app/shared/index';
import { NavBarComponent } from './app/handler/shared/navbar/index';
import { GrowerService } from './app/handler/growers/shared/index';
import { HandlerLoginService } from './app/handler/handlers/handler-login/index';
import { BidService } from './app/handler/bids/shared/index';
import { TraderBidService } from './app/trader/trader-bids/shared/index';

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
           BidService,

           /* Trader Bid Providers */
           TraderBidService,
          ]);
