import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig, RouteParams}
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import {  Grower, GrowerService } from '../shared/index';
import {BidService} from '../../bids/bid.service';
import {Bid} from '../../bids/bid';

@Component({
  templateUrl: 'app/growers/grower-detail.component.html',
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
  providers: [BidService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class GrowerDetailComponent implements OnInit {
  
  private growerId: number;

  private grower: Grower = new Grower();
  private bids: Bid[];  

  constructor(
      params: RouteParams,
      private growerService: GrowerService,
      private _bidService: BidService,
      private logger: Logger,
      private _config: Config,
      private _router: Router) {

    this.growerId = +params.get('id');
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    // Load grower
    this.growerService.getUser(this.growerId)
      .subscribe(
        grower => {
          this.grower = Grower.decode(grower);
        },
        error => {
          this.logger.handleHttpError(error);
          this._config.forceLogout();
        });

    this.bids = [];
    this._bidService.getGrowerBids(this.growerId)
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
