import { Component, OnInit, coreBootstrap } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig }
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import { Bid, BidService } from '../shared/index';
import { BidDetailComponent } from '../bid-detail/index';

@Component({
  templateUrl: 'app/bids/bid-list/bid-list.component.html',
  styleUrls: ['assets/stylesheets/style.css',
              'app/bids/bid-list/bid-list.component.scss'],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class BidListComponent implements OnInit {

  private bids: Bid[];

  private openBids: Bid[];
  private closedBids: Bid[]; 


  constructor(
    private _router: Router, 
    private _bidService: BidService,
    private logger: Logger,
    private _config: Config) {
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    // Load Bids
    this.bids = [];
    this._bidService.getBids()
      .subscribe(
        bids => {
          for (var bidIdx in bids) {
            this.bids.push(Bid.decode(bids[bidIdx]));
          }
          this.openBids = this.bids
            .filter(bid => bid.currentlyOpen); 
          this.closedBids = this.bids
            .filter(bid => !bid.currentlyOpen);
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });

  } 

  viewBid(bid_id: number): void {
    this._router.navigateByUrl('/bids/' + bid_id);
  }
}
