import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Page } from '../../models/Page';


@Component({
  moduleId: module.id,
  selector: 'manuscripts',
  templateUrl: '../../../../templates/manuscripts.component.html'
})


export class ManuscriptsComponent {
	
	private newMan: Manuscript;
	private existingManuscript: Manuscript[];
	private CurrManuscript: Manuscript;
	private pageSrc : string;
	private pageName: String;

	constructor(private mScriptService: ManuscriptsService){
		this.init();
	}

	init(){
		this.newMan = new Manuscript(null);
		this.GetExisting();
		this.CurrManuscript = new Manuscript("Toggle Manuscript")
		
	}
	GetExisting(){

		this.mScriptService.getManuscripts().subscribe(res => {
			if (res){
				this.existingManuscript = res;
				res.forEach(element => {
				});
			}		
			},
			err => {
				alert("Manuscripts could not load!");
			});
		
	}
	setActiveMan(man: Manuscript){
		this.CurrManuscript = man;
	}
	CreateManuscript(){
		this.mScriptService.addManuscript(this.newMan).subscribe(
			res => {
				alert("Manuscript created successfully!");
				this.GetExisting();
				
			},
			err => {
				alert(err._body);
			});
	}
	CreatePage(){
		var data = {manuscript: this.CurrManuscript._id, name:this.pageName, image:this.pageSrc}
		var p = new Page(data);
		this.mScriptService.createPage(p).subscribe(res =>{
			alert("Page was created succesfully")
		}, err=>{
			alert("Page wasnt created succefully")

		});
	}
}