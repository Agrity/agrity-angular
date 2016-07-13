import { Component, Input } from '@angular/core';

import { Config, Logger } from '../../../../shared/index';

import { HandlerSeller } from '../../shared/index';
import { TraderBidService, TraderBid } from '../../../trader-bids/shared/index';
import { BidStatus } from '../../../../shared/index';

@Component({
  selector: 'sg-view-handlers-details',
  styleUrls:
      ['app/trader/handler-sellers/view-handlers/view-handlers-details/view-handlers-details.component.css'],
  templateUrl:
      'app/trader/handler-sellers/view-handlers/view-handlers-details/view-handlers-details.component.html',
})
export class ViewHandlersDetailsComponent {
  private recievedSelectedHandler: HandlerSeller;
  
  constructor(
    private traderBidService: TraderBidService,
    private logger: Logger,
    private config: Config
    ) {
  }

  @Input()
  set selectedHandler(selectedHandler: HandlerSeller) {
    this.recievedSelectedHandler = selectedHandler;
  }

      /* NOTE: Called in .html file. */
  protected viewBid(bid: TraderBid): void {
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
