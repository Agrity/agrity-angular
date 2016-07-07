import { Component, OnInit, coreBootstrap } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig }
    from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';

import { Config, Logger } from '../../shared/index';
import { Grower, GrowerService, Phone } from '../shared/index';


@Component({
  templateUrl: 'app/growers/grower-list/grower-list.component.html',
  styleUrls: ['assets/stylesheets/style.css',
              'app/growers/grower-list/grower-list.component.scss'],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class GrowerListComponent implements OnInit {

  private growers: Grower[];

  constructor(
    private router: Router, 
    private growerService: GrowerService,
    private logger: Logger,
    private config: Config) {
  }

  ngOnInit(){

    if (!this.config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this.config.forceLogout();
      return;   
    }

    // Load Growers
    this.growers = [];
    this.growerService.getGrowers()
      .subscribe(
        growers => {
          for (var growersIdx in growers) {
            console.log(growersIdx);
            this.growers.push(Grower.decode(growers[growersIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });

  } 

  viewGrower(growerId: number){
    this.router.navigateByUrl('/users/' + growerId);
  }
}
