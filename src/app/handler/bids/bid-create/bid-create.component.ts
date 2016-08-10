import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Bid, BidService } from '../shared/index';
import { Config, Logger, UserType, ManagementType }
    from '../../../shared/index';
import { NavBarService }
    from '../../../shared/main-navbar/index';
import { Grower, GrowerService } from '../../growers/shared/index';

import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/bids/bid-create/bid-create.component.css'],
  templateUrl: 'app/handler/bids/bid-create/bid-create.component.html',
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
})

export class BidCreateComponent implements OnInit {

  protected STFC: string = 'STFC';
  protected FCFS: string = 'FCFS';
  protected managementTypeSelection: string = 'FCFS';

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

  private bid: Bid = new Bid();
  private aol: boolean = false;
  private growers: Grower[];

  constructor(
      private bidService: BidService,
      private growerService: GrowerService,
      private logger: Logger,
      private config: Config,
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

    if (this.config.loggedIn() === UserType.TRADER) {
      this.logger.alert('Please log out as a trader to access the handler side of Agrity!');
      this.router.navigateByUrl('/trader-home');
      return;
    }
    this.managementTypeSelection = this.FCFS;

    // Load in Growers
    this.growers = [];
    this.growerService.getGrowers()
      .subscribe(
        growers => { this.growers = growers;
        },
        error => {
          this.logger.handleHttpError(error);
        });
  }

  /* NOTE: Called in .html file. */
  protected save() {
    let selectedGrowers = this.growers.filter(grower => grower.selected);
    this.bid.growerIds = [];

    if (selectedGrowers.length === 0) {
      this.logger.alert('Please select which growers you would like to send your bid to.');
      return;
    }

    if (this.managementTypeSelection === 'FCFS') {
      this.bid.managementType = ManagementType.FCFS;
    }
    if (this.managementTypeSelection === 'STFC') {
      this.bid.managementType = ManagementType.STFC;
    }

    let bidsString: string = '<u><b>BID DETAILS: </b></u>';
    bidsString = bidsString + '<br/>' +
    this.bid.almondPounds.toLocaleString() + ' lbs <br/>' +
    this.bid.almondVariety + '<br/>' +
    this.bid.almondSize;
    if (this.aol) {
      bidsString = bidsString + ' AOL';
    }
    bidsString = bidsString + '<br/>' + '$' + this.bid.pricePerPound + '<br/>';
    if (this.bid.comment !== undefined) {
      bidsString = bidsString + this.bid.comment + '<br/>';
    }

    let termsString = '<u><b>TERMS: </b></u>' + '<br/>';
    if (this.bid.managementType === ManagementType.FCFS) {
      termsString = termsString + 'Firm Bid, First Come First Serve' + '<br/>';
    }
    if (this.bid.managementType === ManagementType.STFC) {
      termsString = termsString + 'Subject to Final Confirmation' + '<br/>';
    }
    termsString = termsString +
        this.bid.managementTypeDelay + ' hours to respond.' + '<br/>';

    let growersString: string = '<u><b>TO: </b></u>';
    for (let grower of selectedGrowers) {
        this.bid.growerIds.push(grower.growerId);
        growersString = growersString + '<br/>' +
            grower.firstName + ' ' + grower.lastName;
    }

    let confirmMsg: string = bidsString + '<br/>' +
        termsString + '<br/>' + growersString;

    this.modal.confirm()
    .size('lg')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm Bid to be Sent')
    .body(confirmMsg)
    .okBtn('Send Bid')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            this.sendConfirmed();
          })
          .catch(canceled => {
            this.logger.alert('Sending has been canceled. Bid not sent.');
          });
    });
  }

  protected sendConfirmed() {

    this.bid.startPaymentMonth = 'January';
    this.bid.startPaymentYear = '2018';
    this.bid.endPaymentMonth = 'February';
    this.bid.endPaymentYear = '2018';
    let space = ' ';
    let temp1 = this.bid.startPaymentMonth.concat(space);
    this.bid.startPaymentDate = temp1.concat(this.bid.startPaymentYear);

    let temp2 = this.bid.endPaymentMonth.concat(space);
    this.bid.endPaymentDate = temp2.concat(this.bid.endPaymentYear);

    if (this.bid.managementTypeDelay < 0) {
      this.bid.managementTypeDelay *= -1;
    }

    if (this.aol) {
      this.bid.almondSize = this.bid.almondSize.concat(' AOL');
    }

    this.bidService.createBid(this.bid)
      .subscribe(
        bid => {
          this.logger.alert('Your bid has been sent.');
          this.router.navigateByUrl('/bids');
        },
        error => {
          if (this.aol) {
            this.bid.almondSize = this.bid.almondSize.substring(0, this.bid.almondSize.length - 4);
          }
          this.logger.handleHttpError(error);
        });
  }

  protected disableDollarSign(keyIdentifier: string) {
    if (keyIdentifier === 'U+0024') {
      return false;
    } else {
      return true;
    }
  }
}
