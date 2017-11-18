import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';

@Component({
  moduleId: module.id,
  selector: 'login-user',
  templateUrl: '../../../../templates/loginUser.component.html',
  providers:[],
  styleUrls: ['../../../../styles/login_user.css']
})

export class LoginUserComponent {
	private loginUserData: Object;
	private currentUser: User;
	private loaded: boolean;
	private isLogged: boolean;

	constructor(private usersService: UsersService){
		this.init();
	}

	init(){
		this.loginUserData = {};
		this.isLogged = false;
		this.checkIfLogged();
	}

	checkIfLogged(){
		this.usersService.getLoggedUser()
			.subscribe(
				res => {
					if (res){
						this.isLogged = true;
						this.currentUser = res;
					}
					this.loaded = true;
				},
				err => {
					this.isLogged = false;
					this.currentUser = new User(null);
					this.loaded = true;
				});
	}

	logout(){
		this.usersService.logOutUser()
			.subscribe(
			res => {
				this.init();
				window.location.href='/';
			},
			err => {
				alert(err._body);
			});
	}

	// login with the given information in 'this.loginUserData'
	loginUser(){
		this.usersService.loginUser(this.loginUserData)
			.subscribe(
				res => {
					if(res){
						this.isLogged = true;
						this.currentUser = res;
						window.location.href='/';
					}
				},
				err => {
					alert(err._body);
				});
	}
}