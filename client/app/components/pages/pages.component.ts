import { Component } from '@angular/core';
import { PagesService } from '../../services/page.service';
import { Page } from '../../models/Page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'pages',
  templateUrl: '../../../../templates/pages.component.html'
})


export class PagesComponent {
	
	private newPage: Page;
	private existingPages: Page[];
	private CurrPage: Page;

	constructor(private pageService: PagesService){
		this.init();
	}

	init(){
		this.newPage = new Page(null);
		this.ExistingPages();
		this.CurrPage = new Page("Toggle Page")
		
	}
	ExistingPages(){

		this.pageService.getPages().subscribe(res => {
			if (res){
				this.existingPages = res;
				res.forEach(element => {
				
				});
			}		
			},
			err => {
				alert("Page could not load!");
			});
		
	}
	setActiveMan(page: Page){
		this.CurrPage = page;
	}
	CreatePage(){
		this.pageService.addPage(this.newPage).subscribe(
			res => {
				alert("Page created successfully!");
				this.ExistingPages();
				
			},
			err => {
				alert(err._body);
			});
	}
	handleUpload(e){
		console.log(e.target.value)
	}
}