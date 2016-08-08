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

    let bidsString: string = 'BID DETAILS:';
    bidsString = bidsString + '<br/>' +
    'Pounds: ' + this.bid.almondPounds.toLocaleString() + ' lbs <br/>' +
    'Variety: ' + this.bid.almondVariety + '<br/>' +
    'Size: ' + this.bid.almondSize;
    if (this.aol) {
      bidsString = bidsString + ' AOL';
    }
    bidsString = bidsString + '<br/>' + 'Price Per Pound: $' + this.bid.pricePerPound + '<br/>';
    if (this.bid.comment !== undefined) {
      bidsString = bidsString + 'Other Details: ' + this.bid.comment + '<br/>';
    } else {
      bidsString = bidsString + 'Other Details: Not Specified' + '<br/>';
    }
    if (this.bid.managementType === ManagementType.FCFS) {
      bidsString = bidsString + 'Firm Bid, First Come First Serve' + '<br/>';
    }
    if (this.bid.managementType === ManagementType.STFC) {
      bidsString = bidsString + 'Subject to Final Confirmation' + '<br/>';
    }
    bidsString = bidsString + '<br/>' + 'Time to Respond: ' +
        this.bid.managementTypeDelay + ' HOURS';

    let growersString: string = 'TO:';
    for (let grower of selectedGrowers) {
        this.bid.growerIds.push(grower.growerId);
        growersString = growersString + '<br/>' +
            grower.firstName + ' ' + grower.lastName;
      }

    let confirmMsg: string = bidsString + '<br/>' + '<br/>' + growersString;

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

    this.bid.managementType = ManagementType.FCFS;

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
