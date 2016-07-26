import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
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
  directives: [RouterLink, ROUTER_DIRECTIVES, ViewBidsDetailsComponent, ViewBidsSidebarComponent],
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
    private config: Config,
    private navBarService: NavBarService) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
      alert('Please logout as a handler to access the trader side of Agrity!');
      this.router.navigateByUrl('/handler-home');
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
        });
  }

  public onSelect(bid: TraderBid) {
    this.selectedBid = bid;
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
}
