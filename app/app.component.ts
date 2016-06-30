import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NavBarComponent} from './navbar.component';
import {HomeComponent} from './home.component';
import {NewGrowerComponent} from './users/newgrower.component';
import {MakeBidComponent} from './bids/makebid.component';
import {ProfileComponent} from './profile/profile.component';
import {NotFoundComponent} from './not-found.component';
import {HandlerLoginComponent} from './handler-login/handler-login.component';
import {ViewBidsComponent} from './bids/view-bids.component';
import {ViewBidComponent} from './bids/view-bid.component';
import {ViewUserComponent} from './users/view-user.component';
import {ViewUsersComponent} from './users/view-users.component';

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent },

  { path: '/handler-login', name: 'Handler Login', component: HandlerLoginComponent },

  { path: '/bids', name: 'View Bids', component: ViewBidsComponent },
  { path: '/bids/:id', name: 'View Bid', component: ViewBidComponent },
  { path: '/bids/new', name: 'Make Bid', component: MakeBidComponent },

  { path: '/users', name: 'ViewUsers', component: ViewUsersComponent}
  { path: '/users/:id', name: 'ViewUser', component: ViewUserComponent },
  { path: '/users/new', name: 'NewGrower', component: NewGrowerComponent },

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
