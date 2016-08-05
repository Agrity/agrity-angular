import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute }
    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { TraderBid, TraderBidService } from '../shared/index';

import { ViewBidsDetailsComponent }
    from './view-bids-details/index';
import { ViewBidsSidebarComponent }
    from './view-bids-sidebar/index';

@Component({
  directives: [ROUTER_DIRECTIVES, ViewBidsDetailsComponent, ViewBidsSidebarComponent],
  styleUrls: ['assets/stylesheets/style.css',
              'app/trader/trader-bids/view-bids/view-bids.component.css'],
  templateUrl: 'app/trader/trader-bids/view-bids/view-bids.component.html',
})

export class ViewBidsComponent implements OnInit, OnDestroy {

  private traderBids: TraderBid[];

  private openTraderBids: TraderBid[];
  private closedTraderBids: TraderBid[];

  private selectedBid: TraderBid;
  private passedBidId: number;
  private counters: Subscription[];

  private sub: Subscription;
  private utcOnInit: Date;
  private timezoneOffset: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private traderBidService: TraderBidService,
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      this.logger.alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.logger.alert('Please log out as a handler to access the trader side of Agrity!');
      this.router.navigateByUrl('/handler-home');
      return;
    }

    this.utcOnInit = new Date();
    this.timezoneOffset = this.utcOnInit.getTimezoneOffset() / 60;

    this.sub = this.route.params
        .subscribe(params => {

          /* Disabling no-string for accessing query params. */
          /* tslint:disable:no-string-literal */
          this.passedBidId = +params['id'];
          /* tslint:enable:no-string-literal */

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
                            if ((this.traderBids[bidIndex]).bidId === this.passedBidId) {
                              this.selectedBid = this.traderBids[bidIndex];
                            }
                            this.traderBids[bidIndex].expirationTime
                                .setHours(this.traderBids[bidIndex]
                                .expirationTime.getHours());
                            this.getCountDownString(this.traderBids[bidIndex]);
                          }
              },
                error => {
                    if (error.status === 401) {
                      this.logger.alert('An authorization error has occured. ' +
                          ' Please log out and try again.');
                      this.router.navigateByUrl('/trader-login');
                    } else {
                      this.logger.handleHttpError(error);
                  }
              });

        });
  }

  public onSelect(traderBid: TraderBid) {
    this.selectedBid = traderBid;
  }

  public onCallRefresh(bid: TraderBid) {
    this.selectedBid = null;
    this.ngOnInit();
  }

  public ngOnDestroy() {
    for (let counterIndex in this.counters) {
      this.counters[counterIndex].unsubscribe();
    }
    if (this.sub) {
    this.sub.unsubscribe();
    }
  }

  protected getCountDownString(bid: TraderBid): void {
    let counter = Observable.interval(1000)
        .map(
          res => {
            let currentTime = new Date();
            currentTime.setHours(currentTime.getHours() - this.timezoneOffset);
            bid.timeToExpire = Math.floor((bid.expirationTime.getTime()
                                    - currentTime.getTime()) / 1000);
            }).subscribe(
              res => {
                TraderBid.updateCountDownString(bid);
              });
    this.counters.push(counter);
  }
}
