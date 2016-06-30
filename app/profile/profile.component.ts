import {Component, OnInit} from '@angular/core';
import {CanDeactivate, Router, RouteParams,RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {ProfileService} from './profile.service';
import {UserService} from '../users/user.service';
import {SpinnerComponent} from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';
import {User} from '../users/user';
import {ErrorHandling} from '../ErrorHandling';

@Component({
    templateUrl: 'app/profile/profile.component.html',
    styles: [`
	.picSection img {
		position:relative;
		background-color:white;
		height:180px;
		width:auto;

		overflow:hidden;
		border-radius:120px;
		border-radius:50px;
		border:4px white solid;

		float:left;
	}

	.picSection {
		background-image:url("assets/img/coverpic.jpg");
		height: 400px;
		background-repeat:no-repeat;
		background-size:cover;
		background-position:center;

		padding-top:280px;
		padding-left:20px;
	}

	.picSection h1{
		color:white;
		position:relative;
		left:10px;
	}

	.Bio {
		padding-top:60px;
	}

	h3 {
		color:black;
	}

	table {
		width:100%;
		table-layout:fixed;
	}

	td {
		vertical-align:top;
		padding:5px;
	}
    `],
    styleUrls: ['assets/stylesheets/style.css'],
    providers: [ProfileService, UserService],
    directives: [SpinnerComponent, PaginationComponent, RouterLink, ROUTER_DIRECTIVES]
})
export class ProfileComponent implements OnInit {
	posts = [];
    pagedPosts = [];
    users = [];
    postsLoading;
    commentsLoading;
    currentPost;
    pageSize = 10;
    
    constructor(
        private _postService: ProfileService,
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
		this._postService.getPosts(filter)
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
        this._postService.getComments(post.id)
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