import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';

@Component({
  moduleId: module.id,
  selector: 'approve-users',
  templateUrl: '../../../../templates/approveUsers.component.html',
  styleUrls: ['../../../../styles/approve_users.css']
})

export class ApproveUsersComponent implements OnInit {
	users: User[];
	loaded: Boolean;

	constructor(private usersService:UsersService){
		this.users = [];
	}

	ngOnInit() {
		let query = { approved: false }
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
		this.loaded = false;
		let query = { _id: user._id, approved: true };
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