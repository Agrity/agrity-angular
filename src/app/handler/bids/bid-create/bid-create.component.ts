import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Bid, BidService } from '../shared/index';
import { Config, Logger, UserType }
    from '../../../shared/index';
import { NavBarService }
    from '../../../shared/main-navbar/index';
import { Grower, GrowerService } from '../../growers/shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/bids/bid-create/bid-create.component.css'],
  templateUrl: 'app/handler/bids/bid-create/bid-create.component.html',
})

export class BidCreateComponent implements OnInit {

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
    private navBarService: NavBarService) {}

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
    this.bid.growerIds
        = this.growers
            .filter(grower => grower.selected)
            .map(grower => grower.growerId);

    this.bid.startPaymentMonth = 'January';
    this.bid.startPaymentYear = '2018';
    this.bid.endPaymentMonth = 'February';
    this.bid.endPaymentYear = '2018';
    let space = ' ';
    let temp1 = this.bid.startPaymentMonth.concat(space);
    this.bid.startPaymentDate = temp1.concat(this.bid.startPaymentYear);

    let temp2 = this.bid.endPaymentMonth.concat(space);
    this.bid.endPaymentDate = temp2.concat(this.bid.endPaymentYear);

    if (this.aol) {
      this.bid.almondSize = this.bid.almondSize.concat(' AOL');
    }

    this.bid.managementType = 'FCFSService';

    if (this.bid.managementTypeDelay < 0) {
      this.bid.managementTypeDelay *= -1;
    }

    this.bidService.createBid(this.bid)
      .subscribe(
        bid => {
          this.router.navigateByUrl('/bids');
        },
        error => {
          this.logger.handleHttpError(error);
        });
  }
}
