import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { TraderBid, TraderBidService } from '../../shared/index';
import { BidStatus, Logger } from '../../../../shared/index';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';
import { HandlerSeller, HandlerSellerService } from '../../../handler-seller/shared/index';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

// Do No Import this from index.
import { ManualTraderBidResponseService } from '../../shared/manual-trader-bid-response.service';

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
  public onCallRefresh = new EventEmitter<TraderBid>();

  private recievedSelectedBid: TraderBid;
  private notAddedHandlerSellers: HandlerSeller[];
  private addHandlersDivToggle: boolean = false;

  constructor(
      private router: Router,
      private traderBidService: TraderBidService,
      private logger: Logger,
      private handlerSellerSevice: HandlerSellerService,
      private manualTraderBidResponseService: ManualTraderBidResponseService,
      public modal: Modal,
      public viewContainer: ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
      }

  @Input()
  set selectedBid(selectedBid: TraderBid) {
    this.recievedSelectedBid = selectedBid;
    this.handlerSellerSevice.getHandlerSellers()
        .subscribe(
            res => {
              if (selectedBid) {
                this.notAddedHandlerSellers = [];
                for (let handlerOfAll of res) {
                  let hasMatch: boolean = false;
                  for (let handlerOfAllInBid of selectedBid.allHandlerSellers) {
                    if (handlerOfAll.handlerId === handlerOfAllInBid.handlerId) {
                      hasMatch = true;
                    }
                  }
                  if (hasMatch === false) {
                    this.notAddedHandlerSellers.push(handlerOfAll);
                  }
                }
              }
            },
            error => {
              this.logger.handleHttpError(error);
            });
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

  protected acceptBid(handler: HandlerSeller, pounds: number) {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm')
    .body('Are you sure you would like to set ' +
        handler.firstName + ' ' + handler.lastName +
        '\'s response to to accepted ' + pounds + ' MT?')
    .okBtn('Set Response')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            this.manualTraderBidResponseService
                .acceptBid(this.recievedSelectedBid.bidId, pounds, handler.handlerId)
                .subscribe(
                    success => {
                      this.logger.alert('Response set to accepted.');
                      this.onCallRefresh.emit(this.recievedSelectedBid);
                    },
                    error => {
                      this.logger.handleHttpError(error);
                    });
                  })
          .catch(canceled => {
            this.logger.alert('Setting response canceled.');
          });
    });
  }

  protected rejectBid(handler: HandlerSeller) {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm')
    .body('Are you sure you would like to set ' +
        handler.firstName + ' ' + handler.lastName +
        '\'s response to to rejected?')
    .okBtn('Set Response')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            this.manualTraderBidResponseService
                .rejectBid(this.recievedSelectedBid.bidId, handler.handlerId)
                .subscribe(
                    success => {
                      this.logger.alert('Response set to rejected.');
                      this.onCallRefresh.emit(this.recievedSelectedBid);
                    },
                    error => {
                      this.logger.handleHttpError(error);
                    });
                  })
          .catch(canceled => {
            this.logger.alert('Setting response canceled.');
          });
    });
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
                      this.onCallRefresh.emit(this.recievedSelectedBid);
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

  protected approve(handler: HandlerSeller, pounds: number) {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm')
    .body('Are you sure you would like to approve ' +
        handler.firstName + ' ' + handler.lastName +
        '\'s acceptance of ' + pounds + ' MT?')
    .okBtn('Approve')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            this.traderBidService
                .approve(this.recievedSelectedBid.bidId, handler.handlerId)
                .subscribe(
                    success => {
                      this.logger.alert('Response set to approved');
                      this.onCallRefresh.emit(this.recievedSelectedBid);
                    },
                    error => {
                      this.logger.handleHttpError(error);
                    });
                  })
          .catch(canceled => {
            this.logger.alert('Approval canceled.');
          });
    });
  }

  protected disapprove(handler: HandlerSeller, pounds: number) {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm')
    .body('Are you sure you would like to disapprove ' +
        handler.firstName + ' ' + handler.lastName +
        '\'s acceptance of ' + pounds + ' MT?')
    .okBtn('Disapprove')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            this.traderBidService
                .reject(this.recievedSelectedBid.bidId, handler.handlerId)
                .subscribe(
                    success => {
                      this.logger.alert('Response set to disapproved');
                      this.onCallRefresh.emit(this.recievedSelectedBid);
                    },
                    error => {
                      this.logger.handleHttpError(error);
                    });
                  })
          .catch(canceled => {
            this.logger.alert('Approval canceled.');
          });
    });
  }

  protected addHandlers() {
    let selectedHandlers = this.notAddedHandlerSellers.filter(handler => handler.selected);
    let confirmMsg: string = 'Are you sure you would like to add these handlers?' + '<br/>';
    for (let handler of selectedHandlers) {
      confirmMsg += '<br/>' + handler.firstName + ' ' + handler.lastName;
    }

    this.modal.confirm()
      .size('sm')
      .isBlocking(true)
      .showClose(false)
      .title('Confirm')
      .body(confirmMsg)
      .okBtn('Send to Handlers')
      .open()
      .then(res => {
        res.result
            .then(confirmed => {
              this.traderBidService.addHandlers(
                  this.recievedSelectedBid.bidId,
                  selectedHandlers)
                  .subscribe(
                    success => {
                      this.logger.alert('Handlers Added');
                      this.toggleAddHandlersDiv();
                      this.onCallRefresh.emit(this.recievedSelectedBid);
                  },
                    error => {
                      this.logger.handleHttpError(error);
                  });
            })
            .catch(canceled => {
              this.logger.alert('Adding handlers canceled.');
            });
      });
  }

  protected toggleAddHandlersDiv() {
    if (this.notAddedHandlerSellers.length === 0) {
      this.logger.alert('You have already added all of your handlers ' +
          'to this bid. There are no handlers left to add.');
    } else {
    this.addHandlersDivToggle = !this.addHandlersDivToggle;
    }
  }
}
