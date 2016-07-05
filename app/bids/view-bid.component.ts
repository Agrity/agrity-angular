import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams, Router} from '@angular/router-deprecated';

import {Config} from '../shared/config.service'; 
import {Observable} from 'rxjs/Observable';
import {BidService} from './bid.service';
import {Bid} from './bid';
import { Logger } from '../shared/logger.service';
import {User} from '../users/user';

@Component({
  templateUrl: 'app/bids/view-bid.component.html',
  styles: [`
    body {
      background-image:url("assets/img/viewbidpic.jpg");
      background-repeat:no-repeat;
      background-attachment: fixed;
      width:100%;
      height:100%;
      background-size:cover;
    }

    footer {
      padding-top:80px;
      background-color:white;
      background-size:100% 100%;
    }

    button {
      margin-bottom:10px; 
      width:90%; 
      height:50px; 
      font-size:1.5em; 
      text-align:left; 
      padding-bottom:10px;
      height:auto;

    }
  `], 
  styleUrls: ['assets/stylesheets/style.css'],
  providers: [BidService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class ViewBidComponent implements OnInit {

  private bidId: number;

  private bid: Bid = new Bid();

  private acceptedGrowers: User[];
  private rejectedGrowers: User[];
  private callRequestedGrowers: User[];
  private noResponseGrowers: User[];

  constructor(
      params: RouteParams,
      private bidService: BidService,
      private logger : Logger,
      private config: Config,
      private router: Router) {

    // TODO Verify id is integer.
    this.bidId = +params.get('id');
  }

  ngOnInit(){

    if (!this.config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this.config.forceLogout();
      return;   
    }

    // Load Bid
    this.bidService.getBid(this.bidId)
      .subscribe(
        bid => {
          this.bid = Bid.decode(bid);

          // TODO Temporary Hack. Should change to store growers in bid
          //      item itself.
          this.acceptedGrowers = Bid.decodeBidAcceptGrowers(bid);
          this.rejectedGrowers = Bid.decodeBidRejectGrowers(bid);
          this.callRequestedGrowers = Bid.decodeBidCallRequestedGrowers(bid);
          this.noResponseGrowers = Bid.decodeBidNoResponseGrowers(bid);
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });
  } 

}
