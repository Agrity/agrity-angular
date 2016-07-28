import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home-page/home.component';

import { HandlerHomeComponent } from './handler/single-pages/handler-home.component';
import { TraderHomeComponent } from './trader/single-pages/trader-home.component';

import { NotFoundComponent } from './handler/single-pages/not-found.component';

/* Handler Pages */
import { HandlerLoginComponent } from './handler/handlers/handler-login/index';
import { TraderLoginComponent } from './trader/traders/trader-login/index';

// TODO Fix Barrel Imports
/* Grower Pages */
import { GrowerCreateComponent } from './handler/growers/grower-create/index';
import { GrowerDetailComponent } from './handler/growers/grower-detail/index';
import { GrowerListComponent } from './handler/growers/grower-list/index';

// TODO Fix Barrel Imports
/* Bid Pages */
import { BidDetailComponent } from './handler/bids/bid-detail/index';
import { BidListComponent } from './handler/bids/bid-list/index';
import { BidCreateComponent } from './handler/bids/bid-create/index';

import { ViewBidsComponent }
    from './trader/trader-bids/view-bids/view-bids.component';
import { ViewHandlersComponent }
    from './trader/handler-seller/view-handlers/view-handlers.component';
import { TraderBidCreateComponent }
    from './trader/trader-bids/bid-create/bid-create.component';
import { HandlerSellerCreateComponent }
    from './trader/handler-seller/handler-create/handler-create.component';

const routes: RouterConfig = [

  { component: HomeComponent, path: '' },

  { component: HandlerHomeComponent, path: 'handler-home' },

  { component: TraderHomeComponent, path: 'trader-home' },

  { component: HandlerLoginComponent, path: 'handler-login' },

  { component: TraderLoginComponent, path: 'trader-login' },

  { component: BidListComponent, path: 'bids' },
  { component: BidDetailComponent, path: 'bids/:id' },
  { component: BidCreateComponent, path: 'new-bid' },

  { component: GrowerListComponent, path: 'growers' },
  { component: GrowerDetailComponent, path: 'growers/:id' },
  { component: GrowerCreateComponent, path: 'new-grower' },

  { component: ViewBidsComponent, path: 'trader-bids'},
  { component: TraderBidCreateComponent, path: 'new-trader-bid'},
  { component: ViewHandlersComponent, path: 'handler-sellers'},
  { component: HandlerSellerCreateComponent, path: 'new-handler-seller'},

  { component: NotFoundComponent, path: '**' },
];

export const appRouterProviders = [
  provideRouter(routes),
];
