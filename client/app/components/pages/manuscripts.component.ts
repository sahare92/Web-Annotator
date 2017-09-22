import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';

@Component({
  moduleId: module.id,
  providers:[],
  selector: 'manuscripts',
  templateUrl: '../../../../templates/manuscripts.component.html'
})

export class ManuscriptsComponent {
	
	private newMan: Object;

	constructor(private mScriptService: ManuscriptsService){
		this.init();
	}

	init(){
		this.newMan = {};	
	}

	CreateMenuscript(){
		this.mScriptService.addManuscript(this.newMan).subscribe(
			res => {
				
				alert("Manuscript created successfully!");
			},
			err => {
				alert(err._body);
			});
	}
}