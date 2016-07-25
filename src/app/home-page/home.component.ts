import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES }
    from '@angular/router-deprecated';
import { UserType, Config } from '../shared/index';

@Component({
  directives: [ROUTER_DIRECTIVES, RouterLink],
  styleUrls: ['app/home-page/home.component.css'],
  templateUrl: 'app/home-page/home.component.html',
})

export class HomeComponent implements OnInit {

  constructor(
    private config: Config,
    private router: Router
    ) {}

  public ngOnInit() {
    if (this.config.loggedIn() === UserType.TRADER) {
        this.router.navigateByUrl('/trader-home');
    }

    if (this.config.loggedIn() === UserType.HANDLER) {
        this.router.navigateByUrl('/handler-home');
    }
  }
}
