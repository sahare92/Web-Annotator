import { Component } from '@angular/core';
import { ManuscriptService } from '../../services/menuscript.service';
import { Manuscript } from '../../models/Manuscript';

@Component({
  moduleId: module.id,
  providers:[],
  selector: 'manuscripts',
  templateUrl: '../../../../templates/Manuscripts.component.html'
})

export class ManuscriptsComponent {
	
	private NewManuscript: String;
	private newMan: Object;

	constructor(private mScriptService: ManuscriptService){
		
		this.init();
		
	}

	init(){
		this.newMan = {};
		
	}

	CreateMenuScript(){
		
		console.log( this.newMan);
		let res = this.mScriptService.addManuscript(this.newMan).subscribe(
			res => {
				
				alert("Manuscript created successfully!");
			},
			err => {
				alert(err._body);
			});
	}
}