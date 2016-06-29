import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Observable} from 'rxjs/Observable';
import {BidService} from './bid.service';
import {Bid} from './bid';
import {ErrorHandling} from '../ErrorHandling';

@Component({
  templateUrl: 'app/bids/view-bids.component.html',
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

export class ViewBidsComponent implements OnInit {

  private bids: Bid[];

  constructor(
    private _bidService: BidService,
    private _errorHandling: ErrorHandling) {
  }

  ngOnInit(){
    // Load Bids
    this.bids = [];
    this._bidService.getBids()
      .subscribe(
        bids => {
          console.log(bids);
          for (var bidIdx in bids) {
            this.bids.push(Bid.decode(bids[bidIdx]));
          }
          console.log(this.bids);
        },
        error => this._errorHandling.handleHttpError(error));

  } 
}
