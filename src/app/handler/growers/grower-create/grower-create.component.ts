import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES }
    from '@angular/router';

import { Config, Logger, UserType }
    from '../../../shared/index';

import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/handler/growers/grower-create/grower-create.component.css'],
  templateUrl: 'app/handler/growers/grower-create/grower-create.component.html',
})

export class GrowerCreateComponent implements OnInit {
  /* NOTE: Referenced in .html file. */
  protected grower = new Grower();

  constructor(
    private router: Router,
    private growerService: GrowerService,
    private config: Config,
    private logger: Logger
  ) {}

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
  }

  /* NOTE: Referenced in .html file. */
  protected save() {
    this.growerService.addGrower(this.grower).subscribe(x => {
      this.grower = Grower.decode(x);
      this.router.navigateByUrl('/growers');
    });
  }
}
