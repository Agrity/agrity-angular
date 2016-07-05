import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Config} from '../config/Config'
import {User} from '../users/user'
import {BidService} from './bid.service';
import {Bid} from './bid';
import { Logger } from '../shared/logger.service';
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
    private logger: Logger,
    private _config: Config,
    private _router: Router) {
    this.newBidForm = fb.group({
      almondVariety: ['', Validators.required],
      pricePerPound: ['', Validators.required],
      almondSize: ['', Validators.required],
      almondPounds: ['', Validators.required],
      startPaymentMonth: ['', Validators.required],
      startPaymentYear: ['', Validators.required],
      endPaymentMonth: ['', Validators.required],
      endPaymentYear: ['', Validators.required],
      delay: ['', Validators.required],
      comment: []
    });
  }

  ngOnInit() {

    if (!this._config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    // Load in Growers
    this.growers = [];
    this._userService.getUsers()
      .subscribe(
        users => {
          for (var userIdx in users) {
            this.growers.push(User.decode(users[userIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });
  }

  save() {
    this.bid.growerIds
        = this.growers
            .filter(grower => grower.selected)
            .map(grower => grower.grower_id);


    //this.bid.paymentDate = ''; // Not Implemented On Server
    var space = " ";
    var temp1 = this.bid.startPaymentMonth.concat(space);
    this.bid.startPaymentDate = temp1.concat(this.bid.startPaymentYear);

    var temp2 = this.bid.endPaymentMonth.concat(space);
    this.bid.endPaymentDate = temp2.concat(this.bid.endPaymentYear);

    this.bid.managementType = 'FCFSService';

    if (this.bid.managementTypeDelay < 0)
      this.bid.managementTypeDelay *= -1

    console.log(this.bid);

    this._bidService.createBid(this.bid)
      .subscribe(
        bid => {
          console.log("Bid Created: ");
          console.log(bid);
          var bidModel: Bid = Bid.decode(bid);
          console.log(Bid.decode(bid));
          this._router.navigateByUrl('/bids/' + bidModel.bid_id);
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });
  }
}
