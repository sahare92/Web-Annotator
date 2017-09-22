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
	
	private NewManuscript: String;
	private newMan: Object;

	constructor(private mScriptService: ManuscriptsService){
		
		this.init();
		
	}

	init(){
		this.newMan = {};
		
	}

	CreateMenuScript(){
		
		
		let res = this.mScriptService.addManuscript(this.newMan).subscribe(
			res => {
				
				alert("Manuscript created successfully!");
			},
			err => {
				alert(err._body);
			});
	}
}