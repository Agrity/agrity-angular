import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Config, Logger, UserType, ManagementType }
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

  protected STFC: string = 'STFC';
  protected FCFS: string = 'FCFS';
  protected managementTypeSelection: string;

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

  protected grades: string[] = [
    'Not Specified',
    'US Fancy',
    'US Extra No. 1',
    'US No. 1 (Supreme)',
    'US Select Sheller Run (SSR)',
    'US Standard Sheller Run',
    'US No. 1 Whole & Broken',
    'US No. 1 Pieces',
    'Standard 5%',
    'Japan Spec',
    'Ungraded',
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

    this.managementTypeSelection = this.FCFS;

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
    if (this.traderBid.grade === undefined) {
      this.traderBid.grade = 'Not Specified';
    }
    if (this.managementTypeSelection === 'FCFS') {
      this.traderBid.managementType = ManagementType.FCFS;
    }
    if (this.managementTypeSelection === 'STFC') {
      this.traderBid.managementType = ManagementType.STFC;
    }
    this.traderBids.push(this.traderBid);
    this.traderBid = new TraderBid();
    this.managementTypeSelection = this.FCFS;
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

  protected sendBids(plusValid: boolean) {
    if (plusValid) {
      this.addBid();
    }

    if (this.traderBids.length === 0) {
      this.logger.alert('Before sending make sure you add bids to your ' +
          'bid sheet using the plus sign on the right.');
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
      bidsString = bidsString + '<br/>' +
      'Pounds: ' + bid.almondPounds + 'MT - ' +
      'Variety: ' + bid.almondVariety + ' - ' +
      'Grade: ' + bid.grade + ' - ' +
      'Size: ' + bid.almondSize + ' - ' +
      'Market Price Per Pound: $' + bid.pricePerPound + '</br>';
      if (bid.comment !== undefined) {
        bidsString = bidsString + 'Other Details: ' + bid.comment + '</br>';
      } else {
      bidsString = bidsString + 'Other Details: Not Specified' + '</br>';
      }
      if (bid.managementType === ManagementType.FCFS) {
        bidsString = bidsString + 'Firm Bid, First Come First Serve' + '<br/>';
      }
      if (bid.managementType === ManagementType.STFC) {
        bidsString = bidsString + 'Subject to Final Confirmation' + '<br/>';
      }
    }

    let handlersString: string = 'TO: ';
    for (let handler of this.handlerSellers) {
      if (handler.selected) {
        handlersString = handlersString + '<br/>' +
            handler.firstName + ' ' + handler.lastName + ' ';
      }
    }

    let confirmMsg: string = bidsString + '<br/>' +
        'TIME TO RESPOND: ' + this.delay + ' HOURS' + '<br/>' +
        '<br/>' + handlersString;

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
            for (let bid of this.traderBids) {
              bid.handlerSellerIds = [];
            }
            this.handlersSelected = false;
            this.logger.alert('Sending has been canceled. Bids not sent.');
          });
    });
  }

  protected sendConfirmedBids() {
          this.traderBidService.createTraderBids(this.traderBids)
              .subscribe(
              bid => {
                this.logger.alert('Your bids have been sent.');
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

  protected getBidOrBidsInvalid(): string {
    if (this.traderBids.length === 1) {
      return 'BID';
    } else {
      return 'BIDS';
    }
  }

  protected getBidOrBidsValid(): string {
    if (this.traderBids.length === 0) {
      return 'BID';
    } else {
      return 'BIDS';
    }
  }

  protected disableDollarSign(keyIdentifier: string) {
    if (keyIdentifier === 'U+0024') {
      return false;
    } else {
      return true;
    }
  }
}
