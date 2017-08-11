import { Component } from '@angular/core';
import { Page } from '../../models/Page';

@Component({
  moduleId: module.id,
  selector: 'workspace-page',
  templateUrl: '../../../../templates/workspacePage.component.html'
})

export class WorkspacePageComponent {
	currentPage: Page;
	// TODO remove this variables just to test
	annotations: object[];
	annotationController;

	constructor(){
		this.init();
	}

	init() {
		this.currentPage = new Page(null);
		this.currentPage.src = "http://i.onionstatic.com/avclub/5667/44/16x9/960.jpg";
	}

	loadAnnotationsFromDB() {
		this.annotations = [
			{
				/** The URL of the image where the annotation should go **/
				src : this.currentPage.src,
				/** The annotation text **/
				text : "test_text",
				/** The annotation shape **/
				shapes : [
					{
						type: 'rect',
						geometry: {
							x:  0.2,
							y:  0.3,
							width:  0.2,
							height:  0.3
						}
					}
				]
			}
		]
		window.anno.addAnnotation(this.annotations[0], this.annotationController);
	}

	loadAnnotations() {
		this.annotationController = window.anno.makeAnnotatable(document.getElementById('anno-img'));
		this.loadAnnotationsFromDB();
	}
}
