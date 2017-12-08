import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';

@Component({
  moduleId: module.id,
  selector: 'approve-users',
  templateUrl: '../../../../templates/approveUsers.component.html'
})

export class ApproveUsersComponent implements OnInit {
	users: User[];
	loaded: Boolean;

	constructor(private usersService:UsersService){
		this.users = [];
	}

	ngOnInit() {
		let query = { authorized: false }
		this.usersService.getUsers(query)
			.subscribe(
				res => {
					if (res){
						this.users = res;
					}
					this.loaded = true;
				},
				err => {
					alert(err);
				});
	}

	approveUser(user: User) {
		let query = { _id: user._id, authorized: true };
		this.usersService.updateUser(query)
			.subscribe(
				res => {
					if (res){
						this.ngOnInit();
					}
				},
				err => {
					alert(err);
				});
	}

}