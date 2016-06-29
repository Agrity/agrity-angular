import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {User} from '../users/user'
import {BidService} from './bid.service';
import {Bid} from './bid';
import {ErrorHandling} from '../ErrorHandling';
import {UserService} from '../users/user.service';
import {SpinnerComponent} from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';

@Component({
  templateUrl: 'app/bids/makebid.component.html',
  styles: [`
    .posts li { cursor: default; }
    .posts li:hover { background: #ecf0f1; } 
    .list-group-item.active, 
    .list-group-item.active:hover, 
    .list-group-item.active:focus { 
      background-color: #ecf0f1;
      border-color: #ecf0f1; 
      color: #2c3e50;
    }
    `],
    styleUrls: ['assets/stylesheets/style.css'],
    providers: [BidService, UserService],
    directives: [SpinnerComponent, PaginationComponent, RouterLink, ROUTER_DIRECTIVES]
})

export class MakeBidComponent implements OnInit {

  private newBidForm: ControlGroup;

  private bid: Bid = new Bid();

  private growers: User[];

  constructor(
    fb: FormBuilder,
    private _bidService: BidService,
    private _userService: UserService,
    private _errorHandling: ErrorHandling) {
    this.newBidForm = fb.group({
      almondVariety: ['', Validators.required],
      pricePerPound: ['', Validators.required],
      almondPounds: ['', Validators.required],
      comment: []
    });
  }

  ngOnInit() {
    // Load in Growers
    this.growers = [];
    this._userService.getUsers()
      .subscribe(
        users => {
          console.log(users);
          for (var userIdx in users) {
            this.growers.push(User.decode(users[userIdx]));
          }
          console.log(this.growers);
        },
        error => this._errorHandling.handleHttpError(error));
  }

  callGetBidsExample() {
    this._bidService.getBids()
      .subscribe(
        bids => {
          console.log("Bids Received: ");
          for (var propName in bids) {
            console.log(propName, bids[propName]);
          }
        },
        error => this._errorHandling.handleHttpError(error));
  }

  callGetBidExample() {
    this._bidService.getBid(1)
      .subscribe(
        bid => {
          console.log("Bid Received: ");
          console.log(bid);
        },
        error => this._errorHandling.handleHttpError(error));
  }

  callCreateBidExample() {
    var bid: Bid = new Bid();
    bid.almondVariety = 'NP';
    bid.almondPounds = '44000';
    bid.pricePerPound = '$3.55'
    bid.paymentDate = '';
    bid.comment = 'Super Cool Comment';

    bid.managementType = 'FCFSService';
    bid.managementTypeDelay = 5;

    bid.growerIds = [1, 2]

    this._bidService.createBid(bid)
      .subscribe(
        bid => {
          console.log("Bid Created: ");
          console.log(bid);
        },
        error => this._errorHandling.handleHttpError(error));
  }

  save() {
    this.growers.forEach(grower => console.log(grower));

    this.bid.growerIds
        = this.growers
            .filter(grower => grower.selected)
            .map(grower => grower.grower_id);


    this.bid.paymentDate = ''; // Not Implemented On Server

    this.bid.managementType = 'FCFSService';
    this.bid.managementTypeDelay = 5;

    this._bidService.createBid(this.bid)
      .subscribe(
        bid => {
          console.log("Bid Created: ");
          console.log(bid);
        },
        error => this._errorHandling.handleHttpError(error));
    console.log("saved");
  }
}
