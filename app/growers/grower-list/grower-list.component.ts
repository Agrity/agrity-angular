import { Component, OnInit  } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Config, Logger } from '../../shared/index';
import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['assets/stylesheets/style.css',
              'app/growers/grower-list/grower-list.component.css'],
  templateUrl: 'app/growers/grower-list/grower-list.component.html',
})

export class GrowerListComponent implements OnInit {

  private growers: Grower[];

  constructor(
    private router: Router,
    private growerService: GrowerService,
    private logger: Logger,
    private config: Config) {
  }

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    // Load Growers
    this.growers = [];
    this.growerService.getGrowers()
      .subscribe(
        growers => { this.growers = growers;
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });

  }

  /* NOTE: Referenced in .html file. */
  protected viewGrower(growerId: number): void {
    this.router.navigateByUrl('/growers/' + growerId);
  }
}
