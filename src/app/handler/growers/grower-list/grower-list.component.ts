import { Component, OnInit  } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Config, Logger, UserType } from '../../../shared/index';
import { NavBarService } from '../../../shared/main-navbar/index';
import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/handler/growers/grower-list/grower-list.component.css'],
  templateUrl: 'app/handler/growers/grower-list/grower-list.component.html',
})

export class GrowerListComponent implements OnInit {

  private growers: Grower[];

  constructor(
    private router: Router,
    private growerService: GrowerService,
    private logger: Logger,
    private config: Config,
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

    // Load Growers
    this.growers = [];
    this.growerService.getGrowers()
      .subscribe(
        growers => { this.growers = growers;
        },
        error => {
              if (error.status === 401) {
                alert('An authorization error has occured. Please log out and try again.');
                this.router.navigateByUrl('/handler-login');
              } else {
                this.logger.handleHttpError(error);
            }        });

  }

  /* NOTE: Referenced in .html file. */
  protected viewGrower(growerId: number): void {
    this.router.navigateByUrl('/growers/' + growerId);
  }
}
