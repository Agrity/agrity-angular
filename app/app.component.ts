import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NavBarComponent} from './navbar.component';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users/users.component';
import {NewGrowerComponent} from './users/newgrower.component';
import {MakeBidComponent} from './makebid/makebid.component';
import {ProfileComponent} from './profile/profile.component';
import {NotFoundComponent} from './not-found.component';

@RouteConfig([
	{ path: '/', name: 'Home', component: HomeComponent },
	{ path: '/users', name: 'Users', component: UsersComponent },
	{ path: '/users/:id', name: 'EditUser', component: NewGrowerComponent },
	{ path: '/users/new', name: 'NewGrower', component: NewGrowerComponent },
    { path: '/makebid', name: 'MakeBid', component: MakeBidComponent },
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