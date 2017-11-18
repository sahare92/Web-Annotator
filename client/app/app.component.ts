import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { WindowService } from './services/window.service';
import { ManuscriptsService } from './services/manuscript.service';
import { TasksService } from './services/tasks.service';
import { User } from './models/User';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: '/../templates/app.component.html',
  providers:[ UsersService, WindowService, ManuscriptsService, TasksService ]
})

export class AppComponent { 
	private tabs: Object[];
	private activeTab: string;
	currentUser: User;
	private loaded: boolean = false;
	private isLogged: boolean = false;

	constructor(private usersService:UsersService){
		this.init();
		this.setActiveTab("home");
	}

	init(){
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
					this.changeNav();
					this.loaded = true;
				},
				err => {
					this.isLogged = false;
					this.currentUser = new User(null);
					this.loaded = true;
					this.changeNav();
				});
	}

	getActiveTab(tabName){
		return this.activeTab == tabName;
	}


	setActiveTab(tabName){
		this.activeTab = tabName;
	}

	changeNav(){
		if(this.isLogged){
			this.tabs = [
				{route: "home", text:"Home"},
				{route: "about", text:"About"},
				{route: "workspace", text:"Workspace"},
				{route: "manuscripts", text:"Manuscripts"},
			];
		}
		else{
			this.tabs = [
				{route: "home", text:"Home"},
				{route: "about", text:"About"},
			];
		}	
	}
}