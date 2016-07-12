import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { Config, Logger } from '../../shared/index';
import { Bid, BidService, BidStatus } from '../shared/index';

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

    if (!this.config.loggedIn()) {
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
                      this.bids[bidIndex].expirationTime
                          .setHours(this.bids[bidIndex]
                          .expirationTime.getHours() + 7);
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

  protected dhms(bid: Bid): string {
    if (!bid.currentlyOpen) {
       return 'Offer Closed';
     }

    if (bid.timeToExpire <= 0) {
       return 'Time Expired';
    }

    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;
    days = Math.floor(bid.timeToExpire / 86400);
    bid.timeToExpire -= days * 86400;
    hours = Math.floor(bid.timeToExpire / 3600) % 24;
    bid.timeToExpire -= hours * 3600;
    minutes = Math.floor(bid.timeToExpire / 60) % 60;
    bid.timeToExpire -= minutes * 60;
    seconds = bid.timeToExpire % 60;
    return [
            days + 'd',
            hours + 'h',
            minutes + 'm',
            seconds + 's',
            ].join(' ');
  }

  protected getCountDownString(bid: Bid): void {
    let counter = Observable.interval(1000)
        .map(
          res => {
            bid.timeToExpire = Math.floor((bid.expirationTime.getTime()
                                    - new Date().getTime()) / 1000);
            }).subscribe(
              res => {
                bid.countDownString = this.dhms(bid);
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
