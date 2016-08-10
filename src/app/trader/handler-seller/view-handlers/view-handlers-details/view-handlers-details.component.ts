import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Config, Logger } from '../../../../shared/index';

import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { HandlerSeller } from '../../shared/index';
import { TraderBid } from '../../../trader-bids/shared/index';

// NOTE: Importing this service through index causes a bug. Not sure why.
import { TraderBidService } from '../../../trader-bids/shared/trader-bid.service';

import { ResponseStatus } from '../../../../shared/index';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'sg-view-handlers-details',
  styleUrls:
      ['app/trader/handler-seller/view-handlers/' // 2 Line URL
       + 'view-handlers-details/view-handlers-details.component.css'],
  templateUrl:
      'app/trader/handler-seller/view-handlers/' // 2 Line URL
      + 'view-handlers-details/view-handlers-details.component.html',
})
export class ViewHandlersDetailsComponent implements OnInit, OnDestroy {

  private recievedSelectedHandler: HandlerSeller;
  private traderBids: TraderBid[];
  private openTraderBids: TraderBid[];
  private closedTraderBids: TraderBid[];
  private counters: Subscription[] = [];
  private utcOnInit: Date;
  private timezoneOffset: number;

  constructor(
      private traderBidService: TraderBidService,
      private logger: Logger,
      private config: Config,
      private router: Router
      ) {
  }

  public ngOnInit() {
    this.utcOnInit = new Date();
    this.timezoneOffset = this.utcOnInit.getTimezoneOffset() / 60;
  }

  public ngOnDestroy() {
    for (let counterIndex in this.counters) {
      this.counters[counterIndex].unsubscribe();
    }
  }

  @Input()
  set selectedHandler(selectedHandler: HandlerSeller) {
    this.recievedSelectedHandler = selectedHandler;
    if (this.recievedSelectedHandler) {
      this.traderBids = [];
      this.traderBidService.getHandlerSellerBids(this.recievedSelectedHandler.handlerId)
        .subscribe(
          bids => {
            this.traderBids = bids;
            this.openTraderBids = this.traderBids
                .filter(bid => bid.currentlyOpen);
            this.closedTraderBids = this.traderBids
                .filter(bid => !bid.currentlyOpen);
            for (let bidIndex in this.traderBids) {
              this.getCountDownString(this.traderBids[bidIndex]);
            }
          },
          error => {
            this.logger.handleHttpError(error);
          });
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

      /* NOTE: Called in .html file. */
  protected viewBid(bidId: number): void {
    this.router.navigate(['/trader-bids', { id: bidId}]);
    return;
  }

  protected isAccepted(bid: TraderBid): boolean {
    if (bid.getBidResponse(bid, this.recievedSelectedHandler.handlerId).responseStatus ===
        ResponseStatus.ACCEPTED ||
        bid.getBidResponse(bid, this.recievedSelectedHandler.handlerId).responseStatus ===
        ResponseStatus.APPROVED) {
      return true;
    }
    return false;
  }

  protected isRejected(bid: TraderBid): boolean {
    if (bid.getBidResponse(bid, this.recievedSelectedHandler.handlerId).responseStatus ===
        ResponseStatus.REJECTED ||
        bid.getBidResponse(bid, this.recievedSelectedHandler.handlerId).responseStatus ===
        ResponseStatus.DISAPPROVED) {
      return true;
    }
    return false;
  }

  protected isNoResponse(bid: TraderBid): boolean {
    if (bid.getBidResponse(bid, this.recievedSelectedHandler.handlerId).responseStatus ===
        ResponseStatus.NO_RESPONSE) {
      return true;
    }
    return false;
  }

  protected isPending(bid: TraderBid): boolean {
    if (bid.getBidResponse(bid, this.recievedSelectedHandler.handlerId).responseStatus ===
        ResponseStatus.PENDING) {
      console.log('true');
      return true;
    }
    console.log('false');
    return false;
  }
}
