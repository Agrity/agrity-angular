import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams }
    from '@angular/router-deprecated';

import { Bid, BidService } from '../../bids/shared/index';
import { Config, Logger } from '../../shared/index';
import { Grower, GrowerService } from '../shared/index';

@Component({
  templateUrl: 'app/growers/grower-detail/grower-detail.component.html',
  styleUrls: ['app/growers/grower-detail/grower-detail.component.scss'],
  providers: [BidService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class GrowerDetailComponent implements OnInit {
  
  private growerId: number;

  private grower: Grower = new Grower();
  private bids: Bid[];  

  constructor(
      params: RouteParams,
      private growerService: GrowerService,
      private bidService: BidService,
      private logger: Logger,
      private config: Config,
      private router: Router) {

    this.growerId = +params.get('id');
  }

  ngOnInit(){

    if (!this.config.loggedIn()) {
      alert("Please Login."
          + "If this issue continues try logging out, then logging back in.");
      this.config.forceLogout();
      return;   
    }

    // Load grower
    this.growerService.getGrower(this.growerId)
      .subscribe(
        grower => {
          this.grower = Grower.decode(grower);
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });

    this.bids = [];
    this.bidService.getGrowerBids(this.growerId)
      .subscribe(
        bids => {
          for (var bidIdx in bids) {
            this.bids.push(Bid.decode(bids[bidIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  } 
}
