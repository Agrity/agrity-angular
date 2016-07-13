import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Bid, BidService } from '../shared/index';
import { Config, Logger }
    from '../../shared/index';
import { Handler, HandlerService } from '../../handlers/shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/trader/bids/bid-create/bid-create.component.css'],
  templateUrl: 'app/trader/bids/bid-create/bid-create.component.html',
})

export class BidCreateComponent implements OnInit {

  private newBidForm: ControlGroup;

  private bid: Bid = new Bid();
  private handlers: Handler[];

  constructor(
    fb: FormBuilder,
    private bidService: BidService,
    private handlerService: HandlerService,
    private logger: Logger,
    private config: Config,
    private router: Router) {
    this.newBidForm = fb.group({
      almondTons: ['', Validators.required],
      almondVariety: ['', Validators.required],
      comment: [],
      delay: ['', Validators.required],
      pricePerTon: ['', Validators.required],
    });
  }

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login.'
          + 'If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    // Load in Handlers
    this.handlers = [];
    this.handlerService.getHandlers()
      .subscribe(
        handlers => { this.handlers = handlers;
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  }

  /* NOTE: Called in .html file. */
  protected save() {
    this.bid.handlerIds
        = this.handlers
            .filter(handler => handler.selected)
            .map(handler => handler.handlerId);

    let space = ' ';

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
