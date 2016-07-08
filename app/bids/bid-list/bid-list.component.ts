import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import { Bid, BidService } from '../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/bids/bid-list/bid-list.component.scss'],
  templateUrl: 'app/bids/bid-list/bid-list.component.html',
})

export class BidListComponent implements OnInit {

  private bids: Bid[];

  private openBids: Bid[];
  private closedBids: Bid[];

  constructor(
    private router: Router,
    private bidService: BidService,
    private logger: Logger,
    private config: Config) {
  }

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    // Load Bids
    this.bids = [];
    this.closedBids = [];
    this.openBids = [];
    this.bidService.getBids()
        .subscribe(
          bids => { this.bids = bids; 
                    this.openBids = this.bids
                        .filter(bid => bid.currentlyOpen); 
                    this.closedBids = this.bids
                        .filter(bid => !bid.currentlyOpen);

        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  } 

  viewBid(bidId: number): void {
    this.router.navigateByUrl('/bids/' + bidId);
  }
}
