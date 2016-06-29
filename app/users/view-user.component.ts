import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams} from '@angular/router-deprecated';

import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {User} from './user';
import {BidService} from '../bids/bid.service';
import {Bid} from '../bids/bid';
import {ErrorHandling} from '../ErrorHandling';

@Component({
  templateUrl: 'app/users/view-user.component.html',
  styles: [], 
  styleUrls: [],
  providers: [UserService, BidService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class ViewUserComponent implements OnInit {
  
  private userId: number;

  private user: User = new User();
  private bids: Bid[];  

  constructor(
      params: RouteParams,
      private _userService: UserService,
      private _bidService: BidService,
      private _errorHandling: ErrorHandling) {

    this.userId = +params.get('id');
  }

  ngOnInit(){
    // Load user
    this._userService.getUser(this.userId)
      .subscribe(
        user => {
          this.user = User.decode(user);
        },
        error => this._errorHandling.handleHttpError(error));

    this.bids = [];
    this._bidService.getGrowerBids(this.userId)
      .subscribe(
        bids => {
          for (var bidIdx in bids) {
            this.bids.push(Bid.decode(bids[bidIdx]));
          }
        },
        error => this._errorHandling.handleHttpError(error));
  } 
}
