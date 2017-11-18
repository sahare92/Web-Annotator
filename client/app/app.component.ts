import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { WindowService } from './services/window.service';
import { ManuscriptsService } from './services/manuscript.service';
import { TaskService } from './services/task.service';
import { User } from './models/User';
import { Input } from '@angular/core/src/metadata/directives';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: '/../templates/app.component.html',
  providers:[ UsersService, WindowService,ManuscriptsService, TaskService ]
})

export class AppComponent { 
	private tabs: Object[];
	private activeTab: string;
	currentUser: User;
	private loaded: boolean;
	private isLogged: boolean;

	constructor(private usersService:UsersService){
		this.init();
		this.setActiveTab("home");
	}

	init(){
		if(this.checkIfLogged()){
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

	getActiveTab(tabName){
		return this.activeTab == tabName;
	}


	setActiveTab(tabName){
		this.activeTab = tabName;
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

}