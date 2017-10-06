import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'manuscripts',
  templateUrl: '../../../../templates/manuscripts.component.html'
})


export class ManuscriptsComponent {
	
	private newMan: Manuscript;
	private existingManuscript: Manuscript[];
	private CurrManuscript: Manuscript;

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
		console.log(man);

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
}