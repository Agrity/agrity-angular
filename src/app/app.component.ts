import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Logger, Config, UserType } from './shared/index';

// TODO Fix Barrel Import
/* Shared Pages */
import { MainNavBarComponent } from './shared/main-navbar/index';
import { NavBarService } from './shared/main-navbar/index';

// TODO Fix Barrel Imports
/* Single Pages */
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

// import { TraderBidCreateComponent } from './trader/trader-bids/bid-create/index';

import { ViewBidsComponent }
    from './trader/trader-bids/view-bids/view-bids.component';
import { ViewHandlersComponent }
    from './trader/handler-seller/view-handlers/view-handlers.component';
import { TraderBidCreateComponent }
    from './trader/trader-bids/bid-create/bid-create.component';
import { HandlerSellerCreateComponent }
    from './trader/handler-seller/handler-create/handler-create.component';

@RouteConfig([
  { component: HomeComponent, name: 'Home', path: '/' },

  { component: HandlerHomeComponent, name: 'Handler Home', path: '/handler-home' },

  { component: TraderHomeComponent, name: 'Trader Home', path: '/trader-home' },

  { component: HandlerLoginComponent, name: 'Handler Login', path: '/handler-login' },

  { component: TraderLoginComponent, name: 'Trader Login', path: '/trader-login' },

  { component: BidListComponent, name: 'View Bids', path: '/bids' },
  { component: BidDetailComponent, name: 'View Bid', path: '/bids/:id' },
  { component: BidCreateComponent, name: 'Make Bid', path: '/bids/new' },

  // { component: TraderBidCreateComponent, name: 'Trader Make Bid', path: '/trader-bids/new' },

  { component: GrowerListComponent, name: 'View Growers', path: '/growers' },
  { component: GrowerDetailComponent, name: 'View Grower', path: '/growers/:id' },
  { component: GrowerCreateComponent, name: 'New Grower', path: '/growers/new' },

  { component: ViewBidsComponent, name: 'View Trader Bids', path: '/trader-bids'},
  { component: TraderBidCreateComponent, name: 'Make Trader Bid', path: '/trader-bids/new'},
  { component: ViewHandlersComponent, name: 'View Handler Sellers', path: '/handler-sellers'},
  { component: HandlerSellerCreateComponent, name: 'New Handler Seller',
        path: '/handler-sellers/new'},

  { component: NotFoundComponent, name: 'NotFound', path: '/not-found' },
  { name: 'Other', path: '/*other', redirectTo: ['Home'] },
])
@Component({
    directives: [MainNavBarComponent, ROUTER_DIRECTIVES],
    providers: [NavBarService],
    selector: 'sg-my-app',
    styleUrls: ['assets/stylesheets/style.css'],
    template: `
        <sg-main-navbar
            [traderLoggedIn]=traderLoggedIn
            [handlerLoggedIn]=handlerLoggedIn
        >
        </sg-main-navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
})

export class AppComponent implements OnInit {

  private traderLoggedIn: boolean;
  private handlerLoggedIn: boolean;

  constructor(
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {}

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.handlerLoggedIn = true;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      this.traderLoggedIn = true;
    }

    /* Disabling no-any for subscribing to event emitter. */
    /* tslint:disable:no-any */
    this.navBarService.traderLoggedIn
        .subscribe(
            (res: any) => {
              this.traderLoggedIn = res;
            },
            (error: any) => {
              this.logger.handleHttpError(error);
              this.config.forceTraderLogout();
            }
          );

    this.navBarService.handlerLoggedIn
        .subscribe(
            (res: any) => {
              this.handlerLoggedIn = res;
            },
            (error: any) => {
              this.logger.handleHttpError(error);
              this.config.forceTraderLogout();
            }
          );
    /* tslint:enable:no-any */
  }
}
