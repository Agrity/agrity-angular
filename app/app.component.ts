import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NavBarComponent} from './shared/navbar/navbar.component';
import {HomeComponent} from './single-pages/home.component';
import {MakeBidComponent} from './bids/makebid.component';
import {ProfileComponent} from './profile/profile.component';
import {NotFoundComponent} from './single-pages/not-found.component';
import {HandlerLoginComponent} from './handlers/handler-login/index'
import {ViewBidsComponent} from './bids/view-bids.component';
import {ViewBidComponent} from './bids/view-bid.component';

// TODO Fix Barrel Imports
import { GrowerCreateComponent } from './growers/grower-create/index';
import { GrowerDetailComponent } from './growers/grower-detail/index';
import { GrowerListComponent } from './growers/grower-list/index';

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent },

  { path: '/handler-login', name: 'Handler Login', component: HandlerLoginComponent },

  { path: '/bids', name: 'View Bids', component: ViewBidsComponent },
  { path: '/bids/:id', name: 'View Bid', component: ViewBidComponent },
  { path: '/bids/new', name: 'Make Bid', component: MakeBidComponent },

  { path: '/users', name: 'ViewUsers', component: GrowerListComponent},
  { path: '/users/:id', name: 'ViewUser', component: GrowerDetailComponent },
  { path: '/users/new', name: 'NewGrower', component: GrowerCreateComponent },

  { path: '/profile', name: 'Profile', component: ProfileComponent },

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
