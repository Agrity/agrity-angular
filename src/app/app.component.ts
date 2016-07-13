import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

// TODO Fix Barrel Import
/* Shared Pages */
import { NavBarComponent } from './handler/shared/navbar/index';

// TODO Fix Barrel Imports
/* Single Pages */
import { HomeComponent } from './handler/single-pages/home.component';
import { NotFoundComponent } from './handler/single-pages/not-found.component';

/* Handler Pages */
import { HandlerLoginComponent } from './handler/handlers/handler-login/index';

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

import { ViewBidsComponent } from './trader/trader-bids/view-bids/view-bids.component';

@RouteConfig([
  { component: HomeComponent, name: 'Home', path: '/' },

  { component: HandlerLoginComponent, name: 'Handler Login', path: '/handler-login' },

  { component: BidListComponent, name: 'View Bids', path: '/bids' },
  { component: BidDetailComponent, name: 'View Bid', path: '/bids/:id' },
  { component: BidCreateComponent, name: 'Make Bid', path: '/bids/new' },

  { component: GrowerListComponent, name: 'View Growers', path: '/growers' },
  { component: GrowerDetailComponent, name: 'View Grower', path: '/growers/:id' },
  { component: GrowerCreateComponent, name: 'New Grower', path: '/growers/new' },

  { component: ViewBidsComponent, name: 'View Trader Bids', path: '/traderbids'},

  { component: NotFoundComponent, name: 'Not Found', path: '/not-found' },
  { name: 'Other', path: '/*other', redirectTo: ['Home'] },
])
@Component({
    directives: [NavBarComponent, ROUTER_DIRECTIVES],
    selector: 'sg-my-app',
    styleUrls: ['assets/stylesheets/style.css'],
    template: `
        <sg-navbar></sg-navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
})
export class AppComponent { }
