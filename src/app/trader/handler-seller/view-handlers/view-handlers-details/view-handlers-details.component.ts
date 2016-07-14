import { Component, Input, OnDestroy } from '@angular/core';

import { Config, Logger } from '../../../../shared/index';

import { HandlerSeller } from '../../shared/index';
import { TraderBidService, TraderBid } from '../../../trader-bids/shared/index';
import { BidStatus } from '../../../../shared/index';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'sg-view-handlers-details',
  styleUrls:
      ['app/trader/handler-seller/view-handlers/' // 2 Line URL
       + 'view-handlers-details/view-handlers-details.component.css'],
  templateUrl:
      'app/trader/handler-seller/view-handlers/' // 2 Line URL
      + 'view-handlers-details/view-handlers-details.component.html',
})
export class ViewHandlersDetailsComponent implements OnDestroy {

  private recievedSelectedHandler: HandlerSeller;
  private traderBids: TraderBid[];
  private openTraderBids: TraderBid[];
  private closedTraderBids: TraderBid[];
  private counters: Subscription[] = [];

  constructor(
      private traderBidService: TraderBidService,
      private logger: Logger,
      private config: Config
      ) {
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
            this.config.forceLogout();
          });
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
  protected viewBid(bidId: number): void {
    // Does Nothing for Now;
    return;
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
