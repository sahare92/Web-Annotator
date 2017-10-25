import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '../../services/users.service'

import { Page } from '../../models/Page';
import { User } from '../../models/User';


@Component({
  moduleId: module.id,
  selector: 'manuscripts',
  templateUrl: '../../../../templates/manuscripts.component.html',
  styleUrls: ['../../../../styles/manuscript.css']
})


export class ManuscriptsComponent {
	
	private newMan: Manuscript;
	private existingManuscript: Manuscript[];
	private currManuscript: Manuscript;
	private pageSrc : string;
	private pageName: String;
	private currUser :User;
	private currPages: Page[];
	private allUsers : User[];
	private shareableUsers : User[];
	constructor(private mScriptService: ManuscriptsService, private uService: UsersService){
		this.init();
	}

	init(){
		this.newMan = new Manuscript(null);
		this.getExisting();
		this.currManuscript = null
		this.getCurrUser(); 
		this.getAllUsers();
		this.shareableUsers = [];

		
	}
	getAllUsers(){
		this.uService.getUsers().subscribe(
			r => {
				this.allUsers = r;
			},
			e =>{
				alert("Some error happedened" + e)
			}
		)
	}
	getCurrManuscriptName(){
		if (this.currManuscript == null){
			return "Select Manuscript"
		}
		else {
			return this.currManuscript.name;
		}
	}
	getExisting(){
		this.mScriptService.getManuscripts().subscribe(res => {
			let activeMans;
			if (res){

				this.existingManuscript = res;

			}		
			},
			err => {
				alert("Manuscripts could not load!");
			});
		
	}
	setActiveMan(man: Manuscript){
		this.currManuscript = man;
		this.allUsers.forEach(element => {
			if (element._id != this.currManuscript.owner && this.currManuscript.shared.indexOf(element._id) == -1){
				this.shareableUsers.push(element);
			}
			this.shareableUsers.forEach(element => {
				console.log(element);
			});
		});
	}
	setActiveManandPages(man: Manuscript){
		this.setActiveMan(man);
		this.getPages();
	}
	createManuscript(){
		this.newMan.owner = this.currUser._id;
		console.log(this.newMan)
		this.mScriptService.addManuscript(this.newMan).subscribe(
			res => {
				alert("Manuscript created successfully!");
				this.getExisting();
				
			},
			err => {
				alert(err._body);
			});
	}
	createPage(){
		var data = {manuscript: this.currManuscript._id,
						 name:this.pageName, 
						 image:this.pageSrc}
		var p = new Page(data);
		this.mScriptService.createPage(p).subscribe(res =>{
			alert("Page was created succesfully")
		}, err=>{
			alert("Error creating page!")
		});
	}

	getCurrUser(){
		this.uService.getLoggedUser().subscribe(
			r=>{
				this.currUser = r;
			}
			,
			s=>{
				alert("NO LOGGED USER!!@##%%@$")
			}

			)
	}
	getPages(){
		let query = {manuscript : this.currManuscript._id};
		this.mScriptService.getPages(query).subscribe(
			r => {
				this.currPages = r;
			},
			e => {
				alert(e + "something went wrong getting pages")
			}
		)
	}
}