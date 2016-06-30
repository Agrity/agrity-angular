import {Component, OnInit, coreBootstrap} from '@angular/core';
import {Router, RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {Config} from '../config/Config';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {User} from './user';
import {ErrorHandling} from '../ErrorHandling';
import {Phone} from './phone';


@Component({
  templateUrl: 'app/users/view-users.component.html',
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
  providers: [UserService],
  directives: [RouterLink, ROUTER_DIRECTIVES]
})

export class ViewUsersComponent implements OnInit {

  private users: User[];

  constructor(
    private _router: Router, 
    private _userService: UserService,
    private _errorHandling: ErrorHandling,
    private _config: Config) {
  }

  ngOnInit(){

    if (!this._config.loggedIn()) {
      alert("Please Login. If this issue continues try logging out, then logging back in.");
      this._config.forceLogout();
      return;   
    }

    // Load Bids
    this.users = [];
    this._userService.getUsers()
      .subscribe(
        users => {
          for (var userIdx in users) {
            this.users.push(User.decode(users[userIdx]));
          }
        },
        error => {
          this._errorHandling.handleHttpError(error);
          this._config.forceLogout();
        });

  } 

  viewUser(user_id){
    this._router.navigateByUrl('/users/' + user_id);
  }
}
