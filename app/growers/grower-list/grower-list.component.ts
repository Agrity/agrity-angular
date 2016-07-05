import {Component, OnInit, coreBootstrap} from '@angular/core';
import {Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig}
    from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';

import { Config, Logger } from '../../shared/index';
import { Grower, GrowerService, Phone } from '../shared/index';


@Component({
  templateUrl: 'app/growers/grower-list/grower-list.component.html',
  styles: [`
    body {
      background-image:url("assets/img/viewbidpic.jpg");
      background-repeat:no-repeat;
      background-attachment: fixed;
      width:100%;
      height:100%;
      background-size:cover;
    }

    footer {
      padding-top:80px;
      background-color:white;
      background-size:100% 100%;
    }
  `], 
  styleUrls: ['assets/stylesheets/style.css'],
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
    this.growerService.getUsers()
      .subscribe(
        growers => {
          for (var growersIdx in growers) {
            this.growers.push(Grower.decode(growers[growersIdx]));
          }
        },
        error => {
          this.logger.handleHttpError(error);
          this.config.forceLogout();
        });

  } 

  viewUser(growerId){
    this.router.navigateByUrl('/users/' + growerId);
  }
}
