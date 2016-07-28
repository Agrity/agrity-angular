import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute }
    from '@angular/router';

import { Bid, BidService } from '../../bids/shared/index';
import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  providers: [BidService],
  styleUrls: ['app/handler/growers/grower-detail/grower-detail.component.css'],
  templateUrl: 'app/handler/growers/grower-detail/grower-detail.component.html',
})

export class GrowerDetailComponent implements OnInit, OnDestroy {

  private growerId: number;
  private grower: Grower = new Grower();
  private bids: Bid[];

  private sub: any;

  constructor(
      private route: ActivatedRoute,
      private growerService: GrowerService,
      private bidService: BidService,
      private logger: Logger,
      private config: Config,
      private router: Router,
      private navBarService: NavBarService) {
  }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.NONE) {
      alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      alert('Please log out as a trader to access the handler side of Agrity!');
      this.router.navigateByUrl('/trader-home');
      return;
    }

    this.sub = this.route.params.subscribe(params => {
      this.growerId = +params['id'];

      this.growerService.getGrower(this.growerId)
        .subscribe(
          grower => {
            this.grower = grower;
          },
          error => {
            this.logger.handleHttpError(error);
          });

      this.bids = [];
      this.bidService.getGrowerBids(this.growerId)
        .subscribe(
          bids => { this.bids = bids;
          },
          error => {
            this.logger.handleHttpError(error);
          });

      });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
