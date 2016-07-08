import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup } from '@angular/common';
import { Router, RouteParams, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';

import { Config, CustomValidators, Logger }
    from '../../shared/index';

import { Grower, GrowerService } from '../shared/index';

@Component({
  directives: [RouterLink, ROUTER_DIRECTIVES],
  styleUrls: ['app/growers/grower-create/grower-create.component.scss'],
  templateUrl: 'app/growers/grower-create/grower-create.component.html',
})

export class GrowerCreateComponent implements OnInit {
  newgrowerform: ControlGroup;
  title: string;
  grower = new Grower();

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

  save() {
    this.growerService.addGrower(this.grower).subscribe(x => {
      this.grower = Grower.decode(x);
      this.router.navigateByUrl('/growers');
    });
  }
}
