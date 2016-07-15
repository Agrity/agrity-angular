import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { NgForm } from '@angular/forms';

import { Config, Logger }
    from '../../../shared/index';

import { HandlerSeller, HandlerSellerService } from '../../handler-seller/shared/index';
import { TraderBid, TraderBidService } from '../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/trader/trader-bids/bid-create/bid-create.component.css'],
  templateUrl: 'app/trader/trader-bids/bid-create/bid-create.component.html',
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

  constructor(
      private traderBidService: TraderBidService,
      private handlerSellerService: HandlerSellerService,
      private config: Config,
      private logger: Logger,
      private router: Router
      ) {}

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login.'
          + 'If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
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
          this.config.forceLogout();
        });
  }

  /* NOTE: Called in .html file. */
  protected addBid() {
    this.traderBids.push(this.traderBid);
    this.traderBid = new TraderBid();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  protected sendBids() {
    for (let bid of this.traderBids) {
      bid.handlerSellerIds = [];
      for (let handler of this.handlerSellers) {
        if (handler.selected) {
          bid.handlerSellerIds.push(handler.handlerId);
        }
      }
    }
    // this.traderBidService.createTraderBids(this.traderBids);
  }
}
