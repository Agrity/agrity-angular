import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

// TODO Fix Barrel Import
/* Shared Pages */
import { NavBarComponent } from './shared/navbar/index';

// TODO Fix Barrel Imports
/* Single Pages */
import { HomeComponent } from './single-pages/home.component';
import { NotFoundComponent } from './single-pages/not-found.component';

/* Handler Pages */
import { HandlerLoginComponent } from './handlers/handler-login/index';

// TODO Fix Barrel Imports
/* Grower Pages */
import { GrowerCreateComponent } from './growers/grower-create/index';
import { GrowerDetailComponent } from './growers/grower-detail/index';
import { GrowerListComponent } from './growers/grower-list/index';

// TODO Fix Barrel Imports
/* Bid Pages */
import { BidDetailComponent } from './bids/bid-detail/index';
import { BidListComponent } from './bids/bid-list/index';
import { BidCreateComponent } from './bids/bid-create/index';

@RouteConfig([
  { component: HomeComponent, name: 'Home', path: '/' },

  { component: HandlerLoginComponent, name: 'Handler Login', path: '/handler-login' },

  { component: BidListComponent, name: 'View Bids', path: '/bids' },
  { component: BidDetailComponent, name: 'View Bid', path: '/bids/:id' },
  { component: BidCreateComponent, name: 'Make Bid', path: '/bids/new' },

  { component: GrowerListComponent, name: 'ViewUsers', path: '/users' },
  { component: GrowerDetailComponent, name: 'ViewUser', path: '/users/:id' },
  { component: GrowerCreateComponent, name: 'NewGrower', path: '/users/new' },

  { component: NotFoundComponent, name: 'NotFound', path: '/not-found' },
  { name: 'Other', path: '/*other', redirectTo: ['Home'] },
])
@Component({
    directives: [NavBarComponent, ROUTER_DIRECTIVES],
    selector: 'my-app',
    styleUrls: ['assets/stylesheets/style.css'],
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
})
export class AppComponent { }
