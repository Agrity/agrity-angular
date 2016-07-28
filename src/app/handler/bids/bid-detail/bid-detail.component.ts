import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }
    from '@angular/router';

import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { Bid, BidService } from '../shared/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/bids/bid-detail/bid-detail.component.css'],
  templateUrl: 'app/handler/bids/bid-detail/bid-detail.component.html',
})

export class BidDetailComponent implements OnInit, OnDestroy {

  private bidId: number;

  private bid: Bid = new Bid();

  private counter: Subscription;
  private sub: Subscription;

  constructor(
      private route: ActivatedRoute,
      private bidService: BidService,
      private logger: Logger,
      private config: Config,
      private router: Router,
      private navBarService: NavBarService) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      alert('Please log out as a trader to access the handler side of Agrity!');
      this.router.navigateByUrl('/trader-home');
      return;
    }

    this.sub = this.route.params.subscribe(params => {

      /* Disabling no-string for accessing query params. */
      /* tslint:disable:no-string-literal */
      this.bidId = +params['id'];
      /* tslint:enable:no-string-literal */
      this.bidService.getBid(this.bidId)
        .subscribe(
          bid => {
            this.bid = bid;
            this.getCountDownString(this.bid);
          },
          error => {
            this.logger.handleHttpError(error);
          });
    });
  }

  public ngOnDestroy() {
    if (this.counter !== null) {
      this.counter.unsubscribe();
      this.sub.unsubscribe();
    }
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
