import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service'
import { TasksService } from '../../services/tasks.service'
import { Task } from '../../models/Task';

import { Page } from '../../models/Page';
import { PageAnnotation } from '../../models/PageAnnotation';
import { User } from '../../models/User';
import { forEach } from '@angular/router/src/utils/collection';


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
	private annotator: User;
	private verifer: User;
	private roles: string [];
	private role: string;
	private canCreateTask: boolean;
	private tasks: Task[];
	private isOwner:Boolean;

	constructor(private mScriptService: ManuscriptsService, private uService: UsersService, private tService: TasksService){
		this.init();
	}

	init(){
		this.existingManuscript = []
		this.getCurrUser(); 
		this.newMan = new Manuscript(null);
		this.currManuscript = null
		this.getAllUsers();
		this.shareableUsers = [];
		this.verifer = null;
		this.canCreateTask = false;
		this.tasks = null;

	}

	canTaskBeCreated(){
		 return this.annotator
		  && this.activePage && this.currManuscript
		  && this.verifer 
	}

	getCurrPageName(){
		if (this.activePage){
			return this.activePage.name
		}
		else{
			return "Please select page"
		}
	}

	getCurrAnnotatorName(){
		if(this.annotator){
			return this.annotator.name
		}
		else{
			return "Please select user"
		}
	}
	getCurrVerifyerName(){
		if(this.verifer){
			return this.verifer.name
		}
		else{
			return "Please select user"
		}
	}

	getAllUsers(){
		this.uService.getUsers(null).subscribe(
			r => {
				this.allUsers = r;
			},
			e =>{
				alert("Some error happedened" + e)
			}
		)
	}

	assignTask(){
		let taskData = {
			manuscript: this.currManuscript._id,
			page: this.activePage._id,
			annotator: this.annotator._id,
			verifier: this.verifer._id,
			assigner: this.currUser._id,
		}
		let pageAnnotationData = {

			user : this.annotator._id,
			page: this.activePage
		}
		let pAnnotation = new PageAnnotation(pageAnnotationData);
		let t = new Task(taskData);
		this.mScriptService.addPageAnnotation(pAnnotation)
			.subscribe(
				pageAnno=>{
					t.pageAnnotation = pageAnno
					this.tService.addTask(t).subscribe(
						r=>{							
							alert("task created succesfuly")
						},
						err=>{
							alert("Cannot create task")
						}
					)
				},
				e=>{
					alert("cannot create page annotation")
				}
			)
	}

	setAnnotator(u){
		this.annotator= u;
	}
	setVerifyer(u){
		this.verifer= u;
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
				res.forEach(man => {
					if (man.owner != null)
						if (man.owner._id == this.currUser._id || 
							man.shared.map(this.getId).indexOf(this.currUser._id) > -1 ){
								this.existingManuscript.push(man)
							}

				});
			}		
			},
			err => {
				alert("Manuscripts could not load!");
			});
	}
	getId(man:Manuscript){
		return man._id
	}

	setActiveMan(man: Manuscript){
		this.currManuscript = man;
		this.setSharableUsers();
		console.log(man.owner._id)
		console.log(this.currUser._id)
		if(man.owner._id == this.currUser._id){
			this.isOwner = true;
		}
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
			if (element._id != this.currManuscript._id && 
				(this.currManuscript.shared.indexOf(element._id) == -1))
				{
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
			this.getPages();
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
				console.log("loggde in")
				this.getExisting()
			}
			,
			s=>{
				alert("NO LOGGED USER!!")
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