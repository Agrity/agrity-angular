import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup } from '@angular/common';
import { Router, RouteParams, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Config, Logger }
    from '../../../shared/index';

import { CustomValidators }
    from '../../shared/index';

import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['app/handler/growers/grower-create/grower-create.component.css'],
  templateUrl: 'app/handler/growers/grower-create/grower-create.component.html',
})

export class GrowerCreateComponent implements OnInit {
  /* NOTE: Referenced in .html file. */
  protected grower = new Grower();

  /* NOTE: Referenced in .html file. */
  protected newgrowerform: ControlGroup;

  /* NOTE: Referenced in .html file. */
  protected title: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private routeParams: RouteParams,
    private growerService: GrowerService,
    private config: Config,
    private logger: Logger
  ) {
    this.newgrowerform = fb.group({
      email: ['', CustomValidators.email],
      first_name: ['', CustomValidators.isName],
      last_name: ['', CustomValidators.isName],
      phone_1: ['', CustomValidators.phoneThree],
      phone_2: ['', CustomValidators.phoneThree],
      phone_3: ['', CustomValidators.phoneFour],
    });
  }

  public ngOnInit() {

    if (!this.config.loggedIn()) {
      alert('Please Login. If this issue continues try logging out, then logging back in.');
      this.config.forceLogout();
      return;
    }

    let id = this.routeParams.get('id');

    this.title = id ? 'Edit Grower' : 'New Grower';

    if (!id) {
      return;
    }

    // TODO Determine if edit grower here or in seperate component.
    // this.userService.getUser(+id)
    //  .subscribe(
    //    grower => this.grower = grower,
    //    error => {
    //      this.logger.handleHttpError(error);
    //      this.config.forceLogout();
    //    });
  }

  /* NOTE: Referenced in .html file. */
  protected save() {
    this.growerService.addGrower(this.grower).subscribe(x => {
      this.grower = Grower.decode(x);
      this.router.navigateByUrl('/growers');
    });
  }
}
