import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { Config, Logger } from '../../../shared/index';
import { TraderBid, TraderBidService } from '../shared/index';
import { BidStatus } from '../../../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/trader/trader-bids/view-bids/view-bids.component.css'],
  templateUrl: 'app/trader/trader-bids/view-bids/view-bids.component.html',
})

export class ViewBidsComponent implements OnInit, OnDestroy {

  private traderBids: TraderBid[];

  private openTraderBids: TraderBid[];
  private closedTraderBids: TraderBid[];

  private selectedBid: TraderBid;
  private counters: Subscription[];

  constructor(
    private router: Router,
    private traderBidService: TraderBidService,
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
    this.counters = [];
    this.traderBids = [];
    this.closedTraderBids = [];
    this.openTraderBids = [];
    this.traderBidService.getTraderBids()
        .subscribe(
          bids => { this.traderBids = bids;
                    this.openTraderBids = this.traderBids
                        .filter(traderBid => traderBid.currentlyOpen);
                    this.closedTraderBids = this.traderBids
                        .filter(traderBid => !traderBid.currentlyOpen);
                    for (let bidIndex in this.traderBids) {
                      this.traderBids[bidIndex].expirationTime
                          .setHours(this.traderBids[bidIndex]
                          .expirationTime.getHours());
                      this.getCountDownString(this.traderBids[bidIndex]);
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

  protected getCountDownString(bid: TraderBid): void {
    let counter = Observable.interval(1000)
        .map(
          res => {
            bid.timeToExpire = Math.floor((bid.expirationTime.getTime()
                                    - new Date().getTime()) / 1000);
            }).subscribe(
              res => {
                TraderBid.updateCountDownString(bid);
              });
    this.counters.push(counter);
  }

  /* NOTE: Called in .html file. */
  protected selectBid(bid: TraderBid): void {
    this.selectedBid = bid;
  }

  protected isAccepted(bid: TraderBid): boolean {
    if (bid.bidStatus === BidStatus.ACCEPTED) {
      return true;
    }
    return false;
  }
  protected isRejected(bid: TraderBid): boolean {
    if (bid.bidStatus === BidStatus.REJECTED) {
      return true;
    }
    return false;
  }
  protected isPartial(bid: TraderBid): boolean {
    if (bid.bidStatus === BidStatus.PARTIAL) {
      return true;
    }
    return false;
  }
}
