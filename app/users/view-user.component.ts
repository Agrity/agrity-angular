import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams} from '@angular/router-deprecated';

import {Config} from '../shared/config.service';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {User} from './user';
import {BidService} from '../bids/bid.service';
import {Bid} from '../bids/bid';
import { Logger } from '../shared/logger.service';

@Component({
  templateUrl: 'app/users/view-user.component.html',
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
      private logger: Logger,
      private _config: Config,
      private _router: Router) {

    this.userId = +params.get('id');
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    // Load user
    this._userService.getUser(this.userId)
      .subscribe(
        user => {
          this.user = User.decode(user);
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });

    this.bids = [];
    this._bidService.getGrowerBids(this.userId)
      .subscribe(
        bids => {
          for (var bidIdx in bids) {
            this.bids.push(Bid.decode(bids[bidIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });
  } 
}
