import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { WindowService } from './services/window.service';
import { ManuscriptService } from './services/menuscript.service';
import { User } from './models/User';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: '/../templates/app.component.html',
  providers:[ UsersService, WindowService,ManuscriptService ]
})

export class AppComponent { 
	private tabs: object[];
	private activeTab: string;

	constructor(private usersService:UsersService){
		this.init();
		this.setActiveTab("home");
	}

	init(){
		this.tabs = [
			{route: "home", text:"Home"},
			{route: "about", text:"About"},
			{route: "workspace", text:"Workspace"},
			{route: "manuscripts", text:"Manuscripts"},
		];
	}

	getActiveTab(tabName){
		return this.activeTab == tabName;
	}


	setActiveTab(tabName){
		this.activeTab = tabName;
	}
}