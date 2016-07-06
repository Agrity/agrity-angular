import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

// TODO Fix Barrel Import
/* Shared Pages */
import {NavBarComponent} from './shared/navbar/index';

// TODO Fix Barrel Imports
/* Single Pages */
import {HomeComponent} from './single-pages/home.component';
import {NotFoundComponent} from './single-pages/not-found.component';

/* Handler Pages */
import {HandlerLoginComponent} from './handlers/handler-login/index'

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
  { path: '/', name: 'Home', component: HomeComponent },

  { path: '/handler-login', name: 'Handler Login', component: HandlerLoginComponent },

  { path: '/bids', name: 'View Bids', component: BidListComponent },
  { path: '/bids/:id', name: 'View Bid', component: BidDetailComponent },
  { path: '/bids/new', name: 'Make Bid', component: BidCreateComponent },

  { path: '/users', name: 'ViewUsers', component: GrowerListComponent},
  { path: '/users/:id', name: 'ViewUser', component: GrowerDetailComponent },
  { path: '/users/new', name: 'NewGrower', component: GrowerCreateComponent },

  { path: '/not-found', name: 'NotFound', component: NotFoundComponent },
  { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['assets/stylesheets/style.css'],
    directives: [NavBarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent { }
