import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, ROUTER_DIRECTIVES, RouteParams, Router }
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import { Bid, BidService } from '../shared/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/bids/bid-detail/bid-detail.component.css'],
  templateUrl: 'app/handler/bids/bid-detail/bid-detail.component.html',
})

export class BidDetailComponent implements OnInit, OnDestroy {

  private bidId: number;

  private bid: Bid = new Bid();

  private counter: Subscription;

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
          this.bid.expirationTime.setHours( this.bid.expirationTime.getHours() + 7);
          this.getCountDownString(this.bid);
          // TODO Temporary Hack. Should change to store growers in bid
          //      item itself.
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });

    // Get countDownString
  }

  public ngOnDestroy() {
    this.counter.unsubscribe();
  }

  protected getCountDownString(bid: Bid): void {
    this.counter = Observable.interval(1000)
        .map(
          res => {
            bid.timeToExpire = Math.floor((this.bid.expirationTime.getTime()
                                    - new Date().getTime()) / 1000);
            }).subscribe(
              res => {
                Bid.updateCountDownString(this.bid);
              });
  }

  /* NOTE: Referenced in .html file. */
  protected viewGrower(growerId: number): void {
    this.router.navigateByUrl('/growers/' + growerId);
  }
}
