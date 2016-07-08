import { Component, OnInit } from '@angular/core';
import { RouterLink, ROUTER_DIRECTIVES, RouteParams, Router }
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import { Bid, BidService } from '../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/bids/bid-detail/bid-detail.component.css'],
  templateUrl: 'app/bids/bid-detail/bid-detail.component.html',
})

export class BidDetailComponent implements OnInit {

  private bidId: number;

  private bid: Bid = new Bid();

  constructor(
      params: RouteParams,
      private bidService: BidService,
      private logger: Logger,
      private config: Config,
      private router: Router) {

    // TODO Verify id is integer.
    this.bidId = +params.get('id');
  }

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    // Load Bid
    this.bidService.getBid(this.bidId)
      .subscribe(
        bid => {
          this.bid = bid;

          // TODO Temporary Hack. Should change to store growers in bid
          //      item itself.
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  }

  /* NOTE: Referenced in .html file. */
  protected viewGrower(growerId: number): void {
    this.router.navigateByUrl('/growers/' + growerId);
  }
}
