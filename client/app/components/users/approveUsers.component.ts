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

	constructor(private usersService:UsersService){}

	ngOnInit() {
		
	}

}