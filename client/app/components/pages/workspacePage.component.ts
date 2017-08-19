import { Component, Injectable } from '@angular/core';
import { Page } from '../../models/Page';
import { WindowService } from '../../services/window.service';
import { WindowConAnno } from '../../models/WindowConAnno';

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
    private _window: WindowConAnno;

	constructor(private windowService: WindowService){
		this.init();
		this._window = windowService.nativeWindow;
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
		this._window.anno.addAnnotation(this.annotations[0], this.annotationController);
	}

	loadAnnotations() {
		this.annotationController = this._window.anno.makeAnnotatable(document.getElementById('anno-img'));
		this.loadAnnotationsFromDB();
	}
}