import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES, RouteParams }
    from '@angular/router-deprecated';

import { Bid, BidService } from '../../bids/shared/index';
import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  providers: [BidService],
  styleUrls: ['app/handler/growers/grower-detail/grower-detail.component.css'],
  templateUrl: 'app/handler/growers/grower-detail/grower-detail.component.html',
})

export class GrowerDetailComponent implements OnInit {

  private growerId: number;

  private grower: Grower = new Grower();
  private bids: Bid[];

  constructor(
      params: RouteParams,
      private growerService: GrowerService,
      private bidService: BidService,
      private logger: Logger,
      private config: Config,
      private router: Router,
      private navBarService: NavBarService) {

    this.growerId = +params.get('id');
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      alert('Please log back in as a handler to access the handler side of Agrity!');
      this.navBarService.onTraderLoggedIn(false);
      this.config.forceLogout();
    }

    // Load grower
    this.growerService.getGrower(this.growerId)
      .subscribe(
        grower => {
          this.grower = grower;
        },
        error => {
          this.logger.handleHttpError(error);
        });

    this.bids = [];
    this.bidService.getGrowerBids(this.growerId)
      .subscribe(
        bids => { this.bids = bids;
        },
        error => {
          this.logger.handleHttpError(error);
        });
  }
}
