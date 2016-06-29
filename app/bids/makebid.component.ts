import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

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

  constructor(
    fb: FormBuilder,
    private _bidService: BidService,
    private _userService: UserService,
    private _errorHandling: ErrorHandling) {
    //this.newBidForm = fb.group({
    //  first_name: ['', Validators.required],
    //  last_name: ['', Validators.required],
    //  email: ['', BasicValidators.email],
    //  phone: []
    //});
  }

  ngOnInit() {
    //this.loadUsers();
    //this.loadPosts();        
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
    console.log("saved");
  }

  //private loadUsers(){
  //  this._userService.getUsers()
  //  .subscribe(users => this.users = users);
  //}

  //private loadPosts(filter?){
  //  this.postsLoading = true; 
  //  //this._bidService.getPosts(filter)
  //  //.subscribe(
  //  //  posts => {
  //  //    this.posts = posts;
  //  //    this.pagedPosts = _.take(this.posts, this.pageSize);
  //  //  },
  //  //  null,
  //  //  () => { this.postsLoading = false; });
  //}

  //reloadPosts(filter){
  //  this.currentPost = null;

  //  this.loadPosts(filter);
  //}

  //select(post){
  //  this.currentPost = post; 

  //  this.commentsLoading = true;
  //  this._bidService.getComments(post.id)
  //    .subscribe(
  //      comments => 
  //      this.currentPost.comments = comments,
  //        null,
  //      () => this.commentsLoading = false); 
  //} 

  //onPageChanged(page) {
  //  var startIndex = (page - 1) * this.pageSize;
  //  this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
  //}
}
