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

 protected NONPAREIL_TYPE: string = 'NONPAREIL-TYPE';
  protected NP_NONPAREIL: string = 'NP-NONPAREIL';
  protected NP_INDEPENDENCE: string = 'NP-INDEPENDENCE';
  protected NP_SONORA: string = 'NP-SONORA';

  protected CARMEL_TYPE: string = 'CARMEL-TYPE';
  protected CR_ALDRICH: string = 'CR-ALDRICH';
  protected CR_AVALON: string = 'CR-AVALON';
  protected CR_CARMEL: string =   'CR-CARMEL';
  protected CR_LIVINGSTON: string = 'CR-LIVINGSTON';
  protected CR_MONTEREY: string = 'CR-MONTEREY';
  protected CR_PRICE: string = 'CR-PRICE';
  protected CR_WOOD_COLONY: string = 'CR-WOOD COLONY';

  protected MISSION_TYPE: string = 'MISSION-TYPE';
  protected MI_BUTTE: string = 'MI-BUTTE';
  protected MI_BUTTE_PADRE: string = 'MI-BUTTE/PADRE';
  protected MI_FRITZ: string = 'MI-FRITZ';
  protected MI_MARCONA: string = 'MI-MARCONA';
  protected MI_MISSION: string = 'MI-MISSION';
  protected MI_PADRE: string = 'MI-PADRE';
  protected MI_RUBY: string = 'MI-RUBY';

  protected CALIFORNIA_TYPE = 'CALIFORNIA-TYPE';
  protected CA_BLUE_GUM: string = 'CA-BLUE GUM';
  protected CA_BUTTE: string = 'CA-BUTTE';
  protected CA_BUTTE_PADRE: string = 'CA-BUTTE/PADRE';
  protected CA_CAPITOLA: string = 'CA-CAPITOLA';
  protected CA_CARMEL: string = 'CA-CARMEL';
  protected CA_CROCKER: string = 'CA-CROCKER';
  protected CA_FRITZ: string = 'CA-FRITZ';
  protected CA_INDEPENDENCE: string = 'CA-INDEPENDENCE';
  protected CA_LIVINGSTON: string = 'CA-LIVINGSTON';
  protected CA_MONTEREY: string = 'CA-MONTEREY';
  protected CA_PADRE: string = 'CA-PADRE';
  protected CA_PEERLESS: string = 'CA-PEERLESS';
  protected CA_PRICE: string = 'CA-PRICE';
  protected CA_NEPLUS: string = 'CA-NEPLUS';
  protected CA_RUBY: string = 'CA-RUBY';
  protected CA_SONORA: string = 'CA-SONORA';
  protected CA_SEEDLING = 'CA-SEEDLING';
  protected CA_SUPREIL: string = 'CA-SUPREIL';
  protected CA_TOKYO: string = 'CA-TOKYO';
  protected CA_WINTERS: string = 'CA-WINTERS';
  protected OTHER_TYPE: string = 'OTHER-TYPE';
  protected MIXED_VARIETY: string = 'MIXED-VARIETY';

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
      if (this.managementTypeSelection === 'FCFS') {
        bid.managementType = ManagementType.FCFS;
      }
      if (this.managementTypeSelection === 'STFC') {
        bid.managementType = ManagementType.STFC;
      }
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

    let bidsString: string = '<u><b>BIDS: </b></u>';
    for (let bid of this.traderBids) {
      bidsString = bidsString + '<br/>' +
      bid.almondPounds.toLocaleString() + 'MT - ' +
      bid.almondVariety + ' - ' +
      bid.grade + ' - ' +
      bid.almondSize + ' - $' +
      bid.pricePerPound;
      if (bid.comment !== undefined) {
        bidsString = bidsString + ' - ' + bid.comment;
      }
    }
    bidsString = bidsString + '<br/>';

    let handlersString: string = '<u><b>TO: </b></u>';
    for (let handler of this.handlerSellers) {
      if (handler.selected) {
        handlersString = handlersString + '<br/>' +
            handler.firstName + ' ' + handler.lastName + ' ';
      }
    }

    let termsString: string = '<u><b>TERMS: </b></u>' + '<br/>' +
        this.delay + ' hours to respond' + '<br/>';
    if (this.managementTypeSelection === this.FCFS) {
      termsString = termsString + 'Firm Bid, First Come First Serve' + '<br/>';
    }
    if (this.managementTypeSelection === this.STFC) {
      termsString = termsString + 'Subject to Final Confirmation' + '<br/>';
    }

    let confirmMsg: string = bidsString + '<br/>' +
    termsString + '<br/>' +
    handlersString;

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
