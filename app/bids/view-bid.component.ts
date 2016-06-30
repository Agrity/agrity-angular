import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams} from '@angular/router-deprecated';

import {Observable} from 'rxjs/Observable';
import {BidService} from './bid.service';
import {Bid} from './bid';
import {ErrorHandling} from '../ErrorHandling';
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
      private _bidService: BidService,
      private _errorHandling: ErrorHandling) {

    // TODO Verify id is integer.
    this.bidId = +params.get('id');
  }

  ngOnInit(){
    // Load Bid
    this._bidService.getBid(this.bidId)
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
        error => this._errorHandling.handleHttpError(error));
  } 
}
