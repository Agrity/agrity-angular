import {Component, OnInit} from '@angular/core';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {BidService} from './bid.service';
import {UserService} from '../users/user.service';
import {SpinnerComponent} from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';

@Component({
  templateUrl: 'app/makebid/makebid.component.html',
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
  posts = [];
  pagedPosts = [];
  users = [];
  postsLoading;
  commentsLoading;
  currentPost;
  pageSize = 10;

  constructor(
    private _bidService: BidService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
    this.loadPosts();        
  }

  private loadUsers(){
    this._userService.getUsers()
    .subscribe(users => this.users = users);
  }

  private loadPosts(filter?){
    this.postsLoading = true; 
    this._bidService.getPosts(filter)
    .subscribe(
      posts => {
        this.posts = posts;
        this.pagedPosts = _.take(this.posts, this.pageSize);
      },
      null,
      () => { this.postsLoading = false; });
  }

  reloadPosts(filter){
    this.currentPost = null;

    this.loadPosts(filter);
  }

  select(post){
    this.currentPost = post; 

    this.commentsLoading = true;
    this._bidService.getComments(post.id)
      .subscribe(
        comments => 
        this.currentPost.comments = comments,
          null,
        () => this.commentsLoading = false); 
  } 

  onPageChanged(page) {
    var startIndex = (page - 1) * this.pageSize;
    this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
  }
}
