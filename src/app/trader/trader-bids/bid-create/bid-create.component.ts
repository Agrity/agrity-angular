import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Config, Logger, UserType }
    from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';

import { HandlerSeller, HandlerSellerService } from '../../handler-seller/shared/index';
import { TraderBid, TraderBidService } from '../shared/index';

import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/trader/trader-bids/bid-create/bid-create.component.css'],
  templateUrl: 'app/trader/trader-bids/bid-create/bid-create.component.html',
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
})

export class TraderBidCreateComponent implements OnInit {

  protected active: boolean = true;

  protected varieties: string[] = [
    'NONPAREIL',
    'CARMEL',
    'BUTTE',
    'PADRE',
    'MISSION',
    'MONTEREY',
    'SONORA',
    'FRITZ',
    'PRICE',
    'PEERLESS',
  ];

  protected sizes: string[] = [
    '16/18',
    '18/20',
    '20/22',
    '22/24',
    '23/25',
    '25/27',
    '27/30',
    '30/32',
    '32/34',
    '34/36',
    '36/38',
    '38/40',
    '40/50',
    '50/60',
    'Any Size',
    'Unsized',
    'Whole & Broken',
    'Inshell',
  ];

  private traderBid: TraderBid = new TraderBid();
  private traderBids: TraderBid[] = [];

  private handlerSellers: HandlerSeller[];
  private delay: number;
  private aol: boolean = false;
  private handlersSelected: boolean = false;

  constructor(
      private traderBidService: TraderBidService,
      private handlerSellerService: HandlerSellerService,
      private config: Config,
      private logger: Logger,
      private router: Router,
      private navBarService: NavBarService,
      public modal: Modal,
      public viewContainer: ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
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

    // Load in handlerSellers
    this.handlerSellers = [];
    this.handlerSellerService.getHandlerSellers()
      .subscribe(
        handlers => { this.handlerSellers = handlers;
        },
        error => {
          this.logger.handleHttpError(error);
        });
  }

  /* NOTE: Called in .html file. */
  protected addBid() {
    if (this.aol) {
      this.traderBid.almondSize += ' AOL';
      this.aol = false;
    }
    this.traderBids.push(this.traderBid);
    this.traderBid = new TraderBid();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  protected removeBid(index: number) {
    this.traderBids.splice(index, 1);
  }

  protected selectAllHandlerSellers() {
    for (let handler of this.handlerSellers) {
      if (!handler.selected) {
        handler.selected = true;
      }
    }
  }

  protected sendBids() {

    if (this.traderBids.length === 0) {
      this.logger.alert('Before sending make sure you add bids to your ' +
          'bid sheet using the green plus sign on the right.');
      return;
    }

    for (let bid of this.traderBids) {
      bid.delay = this.delay;
      bid.handlerSellerIds = [];
      for (let handler of this.handlerSellers) {
        if (handler.selected) {
          if (this.handlersSelected === false) {
            this.handlersSelected = true;
          }
          bid.handlerSellerIds.push(handler.handlerId);
        }
      }
    }

    if (this.handlersSelected === false) {
      this.logger.alert('Please select which handlers you would like to send your bids to.');
      return;
    }

    let bidsString: string = 'BIDS: ';
    for (let bid of this.traderBids) {
      bidsString = bidsString + "<br/>" +
      'Variety: ' + bid.almondVariety + ' ' +
      'Price: ' + bid.pricePerPound + ' ' +
      'Pounds: ' + bid.almondPounds + ' ' +
      'Size: ' + bid.almondSize; + ' ';
    }

    let handlersString: string = 'TO: ';
    for (let handler of this.handlerSellers) {
      handlersString = handlersString + "<br/>" + handler.firstName + ' ' + handler.lastName + ' ';
    }

    let confirmMsg: string = bidsString + "<br/>" + "<br/>" + handlersString;

    this.modal.confirm()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm Bids to be Sent')
    .body(confirmMsg)
    .okBtn('Send Bids')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            this.sendConfirmedBids();
          })
          .catch(canceled => {
            this.handlersSelected = false;
            this.logger.alert('Send bids canceled. Bids not sent.')
          });
    });
  }

  protected sendConfirmedBids() {
          this.traderBidService.createTraderBids(this.traderBids)
              .subscribe(
              bid => {
                this.router.navigateByUrl('/trader-bids');
              },
              error => {
                if (error.status === 500) {
                  this.logger.alert('An internal server error has occured. ' +
                      'This is likely caused by a phone number being entered incorrectly. ' +
                      'If your bids were created, one or more of your handlers might not ' +
                      'have recieved a text message notification. ' +
                      'Please check that your handlers information is correct in the ' +
                      'handler details page.');
                  this.router.navigateByUrl('/trader-bids');
                } else {
                  this.logger.handleHttpError(error);
                  this.router.navigateByUrl('/trader-bids');
                }
              });
  }
}
