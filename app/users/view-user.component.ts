import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {User} from './user';
import {ErrorHandling} from '../ErrorHandling';

@Component({
  templateUrl: 'app/users/view-user.component.html',
  styles: [], 
  styleUrls: [],
  providers: [UserService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class ViewUserComponent implements OnInit {

  private user: User = new User();

  constructor(
    private _userService: UserService,
    private _errorHandling: ErrorHandling) {
  }

  ngOnInit(){
    // Load user
    this._userService.getUser(1)
      .subscribe(
        user => {
          this.user = User.decode(user);
        },
        error => this._errorHandling.handleHttpError(error));

  } 
}