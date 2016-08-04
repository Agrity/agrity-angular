import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }
    from '@angular/router';

import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { Bid, BidService } from '../shared/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

import { Grower, GrowerService } from '../../growers/shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/bids/bid-detail/bid-detail.component.css'],
  templateUrl: 'app/handler/bids/bid-detail/bid-detail.component.html',
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
})

export class BidDetailComponent implements OnInit, OnDestroy {

  private bidId: number;

  private bid: Bid = new Bid();

  private counter: Subscription;
  private utcOnInit: Date;
  private timezoneOffset: number;
  private sub: Subscription;

  private addGrowersDivToggle: boolean = false;
  private notAddedGrowers: Grower[];

  constructor(
      private route: ActivatedRoute,
      private bidService: BidService,
      private growerService: GrowerService,
      private logger: Logger,
      private config: Config,
      private router: Router,
      private navBarService: NavBarService,
      public modal: Modal,
      public viewContainer: ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
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

    this.utcOnInit = new Date();
    this.timezoneOffset = this.utcOnInit.getTimezoneOffset() / 60;

    this.sub = this.route.params.subscribe(params => {

      /* Disabling no-string for accessing query params. */
      /* tslint:disable:no-string-literal */
      this.bidId = +params['id'];
      /* tslint:enable:no-string-literal */
      this.bidService.getBid(this.bidId)
        .subscribe(
          bid => {
            this.bid = bid;
            this.getCountDownString(this.bid);
            this.growerService.getGrowers()
                .subscribe(
                    res => {
                      this.notAddedGrowers = [];
                      for (let growerOfAll of res) {
                        let hasMatch: boolean = false;
                        for (let growerOfAllInBid of this.bid.allGrowers) {
                          if (growerOfAll.growerId === growerOfAllInBid.growerId) {
                            hasMatch = true;
                          }
                        }
                        if (hasMatch === false) {
                          this.notAddedGrowers.push(growerOfAll);
                        }
                      }
                    },
                    error => {
                      this.logger.handleHttpError(error);
                    });

          },
          error => {
            this.logger.handleHttpError(error);
          });
    });
  }

  public ngOnDestroy() {
    if (this.counter !== null) {
      this.counter.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  protected getCountDownString(bid: Bid): void {
    this.counter = Observable.interval(1000)
        .map(
          res => {
            let currentTime = new Date();
            currentTime.setHours(currentTime.getHours() - this.timezoneOffset);
            bid.timeToExpire = Math.floor((bid.expirationTime.getTime()
                                    - currentTime.getTime()) / 1000);
            }).subscribe(
              res => {
                Bid.updateCountDownString(this.bid);
              });
  }

  /* NOTE: Referenced in .html file. */
  protected viewGrower(growerId: number): void {
    this.router.navigate(['/growers', growerId]);
  }

  protected closeBid(bidId: number) {
  this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(false)
    .title('Confirm')
    .body('Are you sure you would like to close this bid?')
    .okBtn('Close Bid')
    .open()
    .then(res => {
      res.result
          .then(confirmed => {
            if (bidId !== null) {
              this.bidService.closeBid(bidId)
                  .subscribe(
                    success => {
                      this.logger.alert('Bid Closed');
                      this.router.navigateByUrl('/bids');
                  },
                    error => {
                    this.logger.handleHttpError(error);
                  });
            }
          })
          .catch(canceled => {
            this.logger.alert('Closing bid has been canceled. The bid remains open.');
          });
    });
  }

  protected addGrowers() {
    let selectedGrowers = this.notAddedGrowers.filter(grower => grower.selected);
    let confirmMsg: string = 'Are you sure you would like to add these growers?' + '<br/>';
    for (let grower of selectedGrowers) {
      confirmMsg += '<br/>' + grower.firstName + ' ' + grower.lastName;
    }

    this.modal.confirm()
      .size('sm')
      .isBlocking(true)
      .showClose(false)
      .title('Confirm')
      .body(confirmMsg)
      .okBtn('Send to Growers')
      .open()
      .then(res => {
        res.result
            .then(confirmed => {
              this.bidService.addGrowers(
                  this.bid.bidId,
                  selectedGrowers)
                  .subscribe(
                    success => {
                      this.logger.alert('Growers Added');
                      this.router.navigateByUrl('/bids');
                  },
                    error => {
                      this.logger.handleHttpError(error);
                  });
            })
            .catch(canceled => {
              this.logger.alert('Adding growers canceled.');
            });
      });
  }

  protected toggleAddGrowersDiv() {
    this.addGrowersDivToggle = !this.addGrowersDivToggle;
  }

}
