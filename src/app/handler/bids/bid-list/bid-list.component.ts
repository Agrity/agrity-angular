import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { Config, Logger, UserType } from '../../../shared/index';
import { Bid, BidService } from '../shared/index';
import { BidStatus } from '../../../shared/bid-status.model';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/bids/bid-list/bid-list.component.css'],
  templateUrl: 'app/handler/bids/bid-list/bid-list.component.html',
})

export class BidListComponent implements OnInit, OnDestroy {

  private bids: Bid[];

  private openBids: Bid[];
  private closedBids: Bid[];

  private counters: Subscription[];

  constructor(
    private router: Router,
    private bidService: BidService,
    private logger: Logger,
    private config: Config) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    // Load Bids
    this.counters = [];
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
                    for (let bidIndex in this.bids) {
                      this.getCountDownString(this.bids[bidIndex]);
                    }
        },
          error => {
            this.logger.handleHttpError(error);
            this.config.forceLogout();

        });
  }

  public ngOnDestroy() {
    for (let counterIndex in this.counters) {
      this.counters[counterIndex].unsubscribe();
    }
  }

  protected getCountDownString(bid: Bid): void {
    let counter = Observable.interval(1000)
        .map(
          res => {
            bid.timeToExpire = Math.floor((bid.expirationTime.getTime()
                                    - new Date().getTime()) / 1000);
            }).subscribe(
              res => {
                Bid.updateCountDownString(bid);
              });
    this.counters.push(counter);
  }

  /* NOTE: Called in .html file. */
  protected viewBid(bidId: number): void {
    this.router.navigateByUrl('/bids/' + bidId);
  }

  protected isAccepted(bid: Bid): boolean {
    if (bid.bidStatus === BidStatus.ACCEPTED) {
      return true;
    }
    return false;
  }
  protected isRejected(bid: Bid): boolean {
    if (bid.bidStatus === BidStatus.REJECTED) {
      return true;
    }
    return false;
  }
  protected isPartial(bid: Bid): boolean {
    if (bid.bidStatus === BidStatus.PARTIAL) {
      return true;
    }
    return false;
  }
}
