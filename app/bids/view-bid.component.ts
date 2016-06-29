import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

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
  `], 
  styleUrls: ['assets/stylesheets/style.css'],
  providers: [BidService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class ViewBidComponent implements OnInit {

  private bid: Bid = new Bid();

  private acceptedGrowers: User[];
  private rejectedGrowers: User[];
  private callRequestedGrowers: User[];
  private noResponseGrowers: User[];

  constructor(
    private _bidService: BidService,
    private _errorHandling: ErrorHandling) {
  }

  ngOnInit(){
    // Load Bid
    this._bidService.getBid(1)
      .subscribe(
        bid => {
          console.log(bid);
          this.bid = Bid.decode(bid);
          console.log(this.bid);

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
