import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute }
    from '@angular/router';

import { Bid, BidService } from '../../bids/shared/index';
import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { Grower, GrowerService } from '../shared/index';

import { Subscription } from 'rxjs/Subscription';

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

  private sub: Subscription;

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
      this.logger.alert('Please Login.');
      this.router.navigateByUrl('/');
      return;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      this.logger.alert('Please log out as a trader to access the handler side of Agrity!');
      this.router.navigateByUrl('/trader-home');
      return;
    }

    this.sub = this.route.params.subscribe(params => {

      /* Disabling no-string for accessing query params. */
      /* tslint:disable:no-string-literal */
      this.growerId = +params['id'];
      /* tslint:enable:no-string-literal */

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
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  /* NOTE: Called in .html file. */
  protected viewBid(bidId: number): void {
    this.router.navigate(['/bids', bidId]);
  }
}
