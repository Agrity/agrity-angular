import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Logger, Config, UserType } from './shared/index';

import { MainNavBarComponent } from './shared/main-navbar/index';
import { NavBarService } from './shared/main-navbar/index';

import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

@Component({
    directives: [ROUTER_DIRECTIVES, MainNavBarComponent],
    providers: [NavBarService, Logger],
    selector: 'sg-my-app',
    styleUrls: ['assets/stylesheets/style.css'],
    template: `
        <sg-main-navbar
            [traderLoggedIn]=traderLoggedIn
            [handlerLoggedIn]=handlerLoggedIn
        >
        </sg-main-navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    viewProviders: [ ...BS_MODAL_PROVIDERS ],
})

export class AppComponent implements OnInit {

  private traderLoggedIn: boolean;
  private handlerLoggedIn: boolean;

  constructor(
    private logger: Logger,
    private config: Config,
    private navBarService: NavBarService,
    public modal: Modal,
    public viewContainer: ViewContainerRef) {
      modal.defaultViewContainer = viewContainer;
    }

  public ngOnInit() {

    if (this.config.loggedIn() === UserType.HANDLER) {
      this.handlerLoggedIn = true;
    }

    if (this.config.loggedIn() === UserType.TRADER) {
      this.traderLoggedIn = true;
    }

    /* Disabling no-any for subscribing to event emitter. */
    /* tslint:disable:no-any */
    this.navBarService.traderLoggedIn
        .subscribe(
            (res: any) => {
              this.traderLoggedIn = res;
            },
            (error: any) => {
              this.logger.handleHttpError(error);
            }
          );

    this.navBarService.handlerLoggedIn
        .subscribe(
            (res: any) => {
              this.handlerLoggedIn = res;
            },
            (error: any) => {
              this.logger.handleHttpError(error);
            }
          );

    this.logger.modalEmitter
        .subscribe(
            (res: any) => {
              this.openAlert(res);
            },
            (error: any) => {
              alert('An Error has occured.');
            }
          );
    /* tslint:enable:no-any */
  }

  private openAlert(modalMsg: string) {
    return this.modal.alert()
        .title('Alert')
        .isBlocking(true)
        .size('sm')
        .message(modalMsg)
        .okBtn('Close')
        .open();
    }
}
