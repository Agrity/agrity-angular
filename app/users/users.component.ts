import {Component, OnInit} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {UserService} from './user.service';

@Component({
    templateUrl: 'app/users/users.component.html',
    providers: [UserService],
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
export class UsersComponent implements OnInit {
    users: any[];
    
    constructor(private _service: UserService){
	}

	ngOnInit(){
		this._service.getUsers()
			.subscribe(users => this.users = users);
	} 
    
    deleteUser(user){
		if (confirm("Are you sure you want to delete " + user.name + "?")) {
			var index = this.users.indexOf(user)
			// Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

			this._service.deleteUser(user.id)
				.subscribe(null, 
					err => {
						alert("Could not delete the user.");
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
						this.users.splice(index, 0, user);
					});
		}
	}
}