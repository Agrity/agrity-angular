import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TraderBid } from '../../shared/index';
import { BidStatus } from '../../../../shared/index';
import { RouterLink, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES, RouterLink],
  selector: 'sg-view-bids-sidebar',
  styleUrls:
      ['app/trader/trader-bids/view-bids/view-bids-sidebar/view-bids-sidebar.component.css'],
  templateUrl:
      'app/trader/trader-bids/view-bids/view-bids-sidebar/view-bids-sidebar.component.html',
})
export class ViewBidsSidebarComponent {

  @Output()
  public onSelect = new EventEmitter<TraderBid>();

  private recievedTraderBids: TraderBid[];
  private recievedOpenTraderBids: TraderBid[];
  private recievedClosedTraderBids: TraderBid[];
  private selectedBid: TraderBid;

  @Input()
  set traderBids(traderBids: TraderBid[]) {
    this.recievedTraderBids = traderBids;
  }

  @Input()
  set openTraderBids(openTraderBids: TraderBid[]) {
    this.recievedOpenTraderBids = openTraderBids;
  }

  @Input()
  set closedTraderBids(closedTraderBids: TraderBid[]) {
    this.recievedClosedTraderBids = closedTraderBids;
  }

  /* NOTE: Called in .html file. */
  protected selectBid(bid: TraderBid): void {
    this.selectedBid = bid;
    this.onSelect.emit(bid);
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
    // Will eventually link to handler page.
    return;
  }

  protected shortenAlmondVariety(almondVariety: string): string {
    if (almondVariety === null ||
        almondVariety === undefined) {
      return '';
    }

    if (almondVariety === 'NONPARIEL-TYPE') {
      return 'NP';
    } else if (almondVariety === 'CARMEL-TYPE') {
      return 'CR';
    } else if (almondVariety === 'MISSION-TYPE') {
      return 'MI'
    } else if (almondVariety === 'CALIFORNIA-TYPE') {
      return 'CA';
    } else if (almondVariety === 'OTHER-TYPE' ||
               almondVariety === 'MIXED-VARIETY') {
      return 'OT';
    }

    return almondVariety.substring(0, 2);
  }
}
