import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { TraderBid, TraderBidService } from '../../shared/index';
import { BidStatus, Logger } from '../../../../shared/index';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';
import { HandlerSeller, HandlerSellerService } from '../../../handler-seller/shared/index';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

@Component({
  directives: [ROUTER_DIRECTIVES],
  selector: 'sg-view-bids-details',
  styleUrls:
      ['app/trader/trader-bids/view-bids/view-bids-details/view-bids-details.component.css'],
  templateUrl:
      'app/trader/trader-bids/view-bids/view-bids-details/view-bids-details.component.html',
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
})
export class ViewBidsDetailsComponent {

  @Output()
  public onCloseBid = new EventEmitter<TraderBid>();

  private recievedSelectedBid: TraderBid;
  private notAddedHandlerSellers: HandlerSeller[];

  constructor(
      private router: Router,
      private traderBidService: TraderBidService,
      private logger: Logger,
      private handlerSellerSevice: HandlerSellerService,
      public modal: Modal,
      public viewContainer: ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
      }

  @Input()
  set selectedBid(selectedBid: TraderBid) {
    this.recievedSelectedBid = selectedBid;
    if (this.recievedSelectedBid) {
      this.handlerSellerSevice.getHandlerSellers()
        .subscribe(
            res => {
              this.notAddedHandlerSellers = res.filter(this.isNotAddedHandlerSeller);
            },
            error => {
              this.logger.handleHttpError(error);
            });
    }
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

  protected closeTraderBid(bidId: number) {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm')
    .body('Are you sure you would like to close this bid?')
    .okBtn('Close Bid')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            if (bidId !== null) {
              return this.traderBidService.closeTraderBid(bidId)
                  .subscribe(
                    success => {
                      this.logger.alert('Bid Closed');
                      this.onCloseBid.emit(this.recievedSelectedBid);
                  },
                    error => {
                    this.logger.handleHttpError(error);
                  });
            }
          })
          .catch(canceled => {
            this.logger.alert('Closing bid has been canceled. The bid is still open.');
          });
    });
  }

  private isNotAddedHandlerSeller(handler: HandlerSeller) {
  //   if (this.recievedSelectedBid !== null) {
  //     if (this.recievedSelectedBid.allHandlerSellers.includes(handler)) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }
    return false;
  }
}
