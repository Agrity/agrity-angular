import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig}
    from '@angular/router-deprecated';

import { Bid, BidService } from '../shared/index';
import { Config, Logger, SpinnerComponent, PaginationComponent }
    from '../../shared/index';
import { Grower, GrowerService } from '../../growers/shared/index';

@Component({
  templateUrl: 'app/bids/bid-create/bid-create.component.html',
  styleUrls: ['assets/stylesheets/style.css',
              'app/bids/bid-create/bid-create.component.scss'],
  directives: [SpinnerComponent, PaginationComponent, RouterLink, ROUTER_DIRECTIVES]
})

export class BidCreateComponent implements OnInit {

  private newBidForm: ControlGroup;

  private bid: Bid = new Bid();

  private growers: Grower[];

  constructor(
    fb: FormBuilder,
    private _bidService: BidService,
    private growerService: GrowerService,
    private logger: Logger,
    private _config: Config,
    private _router: Router) {
    this.newBidForm = fb.group({
      almondVariety: ['', Validators.required],
      pricePerPound: ['', Validators.required],
      almondSize: ['', Validators.required],
      almondPounds: ['', Validators.required],
      startPaymentMonth: ['', Validators.required],
      startPaymentYear: ['', Validators.required],
      endPaymentMonth: ['', Validators.required],
      endPaymentYear: ['', Validators.required],
      delay: ['', Validators.required],
      comment: []
    });
  }

  ngOnInit() {

    if (!this._config.loggedIn()) {
      alert("Please Login."
          + "If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    // Load in Grower
    this.growers = [];
    this.growerService.getGrowers()
      .subscribe(
        growers => {
          for (var growerIdx in growers) {
            this.growers.push(Grower.decode(growers[growerIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });
  }

  save() {
    this.bid.growerIds
        = this.growers
            .filter(grower => grower.selected)
            .map(grower => grower.grower_id);


    //this.bid.paymentDate = ''; // Not Implemented On Server
    var space = " ";
    var temp1 = this.bid.startPaymentMonth.concat(space);
    this.bid.startPaymentDate = temp1.concat(this.bid.startPaymentYear);

    var temp2 = this.bid.endPaymentMonth.concat(space);
    this.bid.endPaymentDate = temp2.concat(this.bid.endPaymentYear);

    this.bid.managementType = 'FCFSService';

    if (this.bid.managementTypeDelay < 0)
      this.bid.managementTypeDelay *= -1

    console.log(this.bid);

    this._bidService.createBid(this.bid)
      .subscribe(
        bid => {
          console.log("Bid Created: ");
          console.log(bid);
          var bidModel: Bid = Bid.decode(bid);
          console.log(Bid.decode(bid));
          this._router.navigateByUrl('/bids');
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });
  }
}
