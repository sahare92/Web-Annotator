import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/Task';

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
	private selectedUsr :User;
	private activePage :Page;
	private worker: User;
	private roles: string [];
	private role: string;
	private canCreateTask: boolean;
	private tasks: Task[];

	constructor(private mScriptService: ManuscriptsService, private uService: UsersService, private tService: TaskService){
		this.init();
	}

	init(){
		this.newMan = new Manuscript(null);
		this.getExisting();
		this.currManuscript = null
		this.getCurrUser(); 
		this.getAllUsers();
		this.shareableUsers = [];
		this.activePage = null;
		this.worker = null;
		this.initRoles();
		this.canCreateTask = false;
		this.tasks = null;

	}
	getTasks(){
		console.log("Getting tasks")
		this.tService.getTasks( {
			manuscript : this.currManuscript._id,
			owner : this.currUser._id
		}).subscribe(
			r=> {this.tasks = r;
			},
			e=>alert("Error loading tasks")
		)
	}
	completeTask(t : Task){
		t.status = "Completed"
		this.tService.updateTask(t).subscribe(
			r=>{
				
				alert("Task is set as done");
				this.getTasks();},
			e => alert(e)
		)
		
	}
	canTaskBeCreated(){
		 return this.role && this.worker && this.activePage && this.currManuscript 
	}
	initRoles(){
		this.roles = ["Annotator", "Verifyer"]
	}
	selectRole(r){
		this.role = r;
	}
	getCurrRole(){
		if (this.role){
			return this.role
		}
		else{
			return "Select role"
		}
	}
	getCurrPageName(){
		if (this.activePage){
			return this.activePage.name
		}
		else{
			return "Please select page"
		}

	}
	getCurrWorkerName(){
		if(this.worker){
			return this.worker.name
		}
		else{
			return "Please select user"
		}

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
	assignTask(){
		let data = {
			name:"newT",
			manuscript : this.currManuscript._id,
			page : this.activePage._id,
			role : this.role,
			worker: this.worker._id,
			owner: this.currUser._id,
			note:  this.worker.name + " " + this.worker.family_name + 
					" as: " + this.role +  " in page: " + this.activePage.name
		}
		let t = new Task(data);
		this.tService.addTask(t).subscribe(
			r=>{
				alert("task created succesfuly")
			},
			err=>{
				alert("shit happens")
			}
		)
	}
	setWorker(u){
		this.worker= u;
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
		this.setSharableUsers();
		this.getTasks();
	}
	setActivePage(){
		this.mScriptService.getPages({manuscript: this.currManuscript._id}).subscribe(
			res =>{
				this.currPages = res;
			},
			err=>{
				alert(err)
			}
		)

	}
	setPage(page){
		this.activePage = page;
		

	}
	setSharableUsers(){
		this.allUsers.forEach(element => {
			if (element._id != this.currManuscript.owner && 
				this.currManuscript.shared.indexOf(element._id) == -1){
				this.shareableUsers.push(element);
			}
			this.shareableUsers.forEach(element => {

			});
		});
	}
	setActiveManandPages(man: Manuscript){
		this.setActiveMan(man);
		this.getPages();
	}
	selectUsr(usr){
		this.selectedUsr = usr;
	}
	restartMans(){
		this.shareableUsers = []
		this.setSharableUsers();
	}
	shareMan(){
		this.currManuscript.shared.push(this.selectedUsr._id)
		this.mScriptService.updateMan(this.currManuscript).subscribe(
			res=>{
				alert("Manuscript shared succefully!")
				this.restartMans();
			},
			err=>{
				alert("Something went wrong sharing manuscript")
			}
		)
	}
	createManuscript(){
		this.newMan.owner = this.currUser._id;
		
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
	getShareableUsers(){
		if (this.selectedUsr == null){
			return "Please select user"
		}
		else{
			return this.selectedUsr.name
		}
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