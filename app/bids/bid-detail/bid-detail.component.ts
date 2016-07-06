import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams, Router}
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import { Grower } from '../../growers/shared/index';
import { Bid, BidService } from '../shared/index';

@Component({
  templateUrl: 'app/bids/bid-detail/bid-detail.component.html',
  styleUrls: ['assets/stylesheets/style.css',
              'app/bids/bid-detail/bid-detail.component.scss'],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class BidDetailComponent implements OnInit {

  private bidId: number;

  private bid: Bid = new Bid();

  private acceptedGrowers: Grower[];
  private rejectedGrowers: Grower[];
  private callRequestedGrowers: Grower[];
  private noResponseGrowers: Grower[];

  constructor(
      params: RouteParams,
      private bidService: BidService,
      private logger : Logger,
      private config: Config,
      private router: Router) {

    // TODO Verify id is integer.
    this.bidId = +params.get('id');
  }

  ngOnInit(){

    if (!this.config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this.config.forceLogout();
      return;   
    }

    // Load Bid
    this.bidService.getBid(this.bidId)
      .subscribe(
        bid => {
          this.bid = Bid.decode(bid);

          // TODO Temporary Hack. Should change to store growers in bid
          //      item itself.
          this.acceptedGrowers = Bid.decodeBidAcceptGrowers(bid);
          this.rejectedGrowers = Bid.decodeBidRejectGrowers(bid);
          this.callRequestedGrowers = Bid.decodeBidCallRequestedGrowers(bid);
          this.noResponseGrowers = Bid.decodeBidNoResponseGrowers(bid);
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  } 
}
