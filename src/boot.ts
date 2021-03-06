import { bootstrap }    from '@angular/platform-browser-dynamic';
import { appRouterProviders } from './app/app.routes';

import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { Config, HttpClient, Logger } from './app/shared/index';
import { NavBarService } from './app/shared/main-navbar/index';
import { GrowerService } from './app/handler/growers/shared/index';
import { HandlerLoginService } from './app/handler/handlers/handler-login/index';
import { BidService } from './app/handler/bids/shared/index';
import { TraderBidService } from './app/trader/trader-bids/shared/index';
import { HandlerSellerService } from './app/trader/handler-seller/shared/index';
import { TraderLoginService } from './app/trader/traders/trader-login/index';
import { ManualTraderBidResponseService } from './app/trader/trader-bids/shared/index';
import { ManualBidResponseService } from './app/handler/bids/shared/index';

import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser';

bootstrap(AppComponent,
          [/* Angular Providers */
           HTTP_PROVIDERS,
           appRouterProviders,

           { provide: LocationStrategy, useClass: HashLocationStrategy },

           /* Shared Providers */
           Logger,
           Config,
           HttpClient,
           NavBarService,

           /* Handler Providers */
           HandlerLoginService,

           /* Grower Providers */
           GrowerService,

           /* Bid Providers */
           BidService,
           ManualBidResponseService,

           /* Trader Bid Providers */
           TraderBidService,
           ManualTraderBidResponseService,

           /* Handler Seller Providers */
           HandlerSellerService,

           /* Trader Providers */
           TraderLoginService,

           /* Forms */
           disableDeprecatedForms(),
           provideForms(),

          /* Modal Providers */
          ...MODAL_BROWSER_PROVIDERS,
          ]);
