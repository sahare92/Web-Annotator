import { Page } from '../../models/Page';
import { Annotation, DisplayedAnnotation } from '../../models/Annotation';
import { PageAnnotation } from '../../models/PageAnnotation';
import { WindowService } from '../../services/window.service';
import { WindowConAnno } from '../../models/WindowConAnno';
import { Component, Injectable } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'workspace-page',
  templateUrl: '../../../../templates/workspacePage.component.html'
})

export class WorkspacePageComponent {
	// TODO remove this variables just to test
	pageAnnotation: PageAnnotation;
	page: Page;
	annotations: Annotation[];
	displayedAnnotations: DisplayedAnnotation[];
	annoObject; /* The current pageAnnotation controller object */
    private _window: WindowConAnno;

	constructor(private windowService: WindowService){
		this.init();
		this._window = windowService.nativeWindow;
	}

	init() {
		this.displayedAnnotations = [];
		this.annotations =[ 
			new Annotation(
					{
						text: 'lemmy 4 ever!!',
						geometry: {
							x: 0.1,
							y: 0.2,
							width: 0.4,
							height: 0.3
						}
					}
				),
			new Annotation(
					{
						text: 'lemmy is god!!',
						geometry: {
							x: 0.5,
							y: 0.2,
							width: 0.1,
							height: 0.3
						}
					}
				)
		]
		this.page = new Page(
				{
					id: '1',
					manuscript: '1',
					number: 1,
					image: 'https://secondhandsongs.com/picture/162139/original'
				}
			);
		this.pageAnnotation = new PageAnnotation(
				{
					id: '1',
					page: this.page,
					annotations: this.annotations
				}
			);
	}

	loadAnnotationsFromDB() {
		this.annotations.forEach((a) => {
			var displayedAnno = new DisplayedAnnotation(a, this.page.image);
			this.displayedAnnotations.push(
					displayedAnno
				);
			this._window.anno.addAnnotation(displayedAnno); // the method that actually adds the annotation to the displayed page
		});
	}

	loadAnnotations() {
		this.annoObject = this._window.anno.makeAnnotatable(document.getElementById('anno-img'));
		this.loadAnnotationsFromDB();
	}
}