import {Component, OnInit, coreBootstrap} from '@angular/core';
import {Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Config} from '../config/Config';
import {Observable} from 'rxjs/Observable';
import {BidService} from './bid.service';
import {Bid} from './bid';
import {ErrorHandling} from '../ErrorHandling';
import {Collapse} from './collapse';
import {ViewBidComponent} from './view-bid.component';

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
  directives: [RouterLink, ROUTER_DIRECTIVES, Collapse]
})

export class ViewBidsComponent implements OnInit {

  private bids: Bid[];
  public isCollapsed: boolean = false;


  constructor(
    private _router: Router, 
    private _bidService: BidService,
    private _errorHandling: ErrorHandling,
    private _config: Config) {
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      this._router.navigateByUrl('/handler-login');
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      return;   
    }

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
        error => {
          this._errorHandling.handleHttpError(error);
        });

  } 

  viewBid(bid_id){
    this._router.navigateByUrl('/bids/' + bid_id);
  }
}
