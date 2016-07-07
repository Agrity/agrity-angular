import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Bid, BidService } from '../shared/index';
import { Config, Logger }
    from '../../shared/index';
import { Grower, GrowerService } from '../../growers/shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/bids/bid-create/bid-create.component.scss'],
  templateUrl: 'app/bids/bid-create/bid-create.component.html',
})

export class BidCreateComponent implements OnInit {

  private newBidForm: ControlGroup;

  private bid: Bid = new Bid();

  private growers: Grower[];

  constructor(
    fb: FormBuilder,
    private bidService: BidService,
    private growerService: GrowerService,
    private logger: Logger,
    private config: Config,
    private router: Router) {
    this.newBidForm = fb.group({
      almondPounds: ['', Validators.required],
      almondSize: ['', Validators.required],
      almondVariety: ['', Validators.required],
      comment: [],
      delay: ['', Validators.required],
      endPaymentMonth: ['', Validators.required],
      endPaymentYear: ['', Validators.required],
      pricePerPound: ['', Validators.required],
      startPaymentMonth: ['', Validators.required],
      startPaymentYear: ['', Validators.required],
    });
  }

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login.'
          + 'If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    // Load in Grower
    this.growers = [];
    this.growerService.getGrowers()
      .subscribe(
        growers => {
          for (let growerIdx in growers) {
            this.growers.push(Grower.decode(growers[growerIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  }

  save() {
    this.bid.growerIds
        = this.growers
            .filter(grower => grower.selected)
            .map(grower => grower.grower_id);

    // this.bid.paymentDate = ''; // Not Implemented On Server
    let space = ' ';
    let temp1 = this.bid.startPaymentMonth.concat(space);
    this.bid.startPaymentDate = temp1.concat(this.bid.startPaymentYear);

    let temp2 = this.bid.endPaymentMonth.concat(space);
    this.bid.endPaymentDate = temp2.concat(this.bid.endPaymentYear);

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
          this.config.forceLogout();
        });
  }
}
