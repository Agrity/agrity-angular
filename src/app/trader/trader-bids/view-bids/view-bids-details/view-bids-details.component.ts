import { Component, Input } from '@angular/core';
import { TraderBid } from '../../shared/index';
import { BidStatus } from '../../../../shared/index';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'sg-view-bids-details',
  styleUrls:
      ['app/trader/trader-bids/view-bids/view-bids-details/view-bids-details.component.css'],
  templateUrl:
      'app/trader/trader-bids/view-bids/view-bids-details/view-bids-details.component.html',
})
export class ViewBidsDetailsComponent {
  private recievedSelectedBid: TraderBid;

  constructor(
      private router: Router
      ) {
  }

  @Input()
  set selectedBid(selectedBid: TraderBid) {
    this.recievedSelectedBid = selectedBid;
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

  protected viewHandler(handlerId: number): void {
    this.router.navigate(['/handler-sellers', { id: handlerId}]);
    return;
  }
}
