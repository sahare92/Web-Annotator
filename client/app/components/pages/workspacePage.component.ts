import { Page } from '../../models/Page';
import { Annotation, DisplayedAnnotation } from '../../models/Annotation';
import { PageAnnotation } from '../../models/PageAnnotation';
import { WindowService } from '../../services/window.service';
import { WindowConAnno } from '../../models/WindowConAnno';
import { Component, Injectable } from '@angular/core';
import * as _ from 'underscore';

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
    _window: WindowConAnno;

	constructor(private windowService: WindowService){
		this._window = windowService.nativeWindow;
		this.init();
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

		this.initHandlers()
	}

	initHandlers() {
		//------------------Creating the Handlers for annotation events----------------//

		this._window.anno.addHandler('onAnnotationCreated', function(annotation){
			this.annotations.push(
					new Annotation(
							{
								text: annotation.text,
								geometry: annotation.shapes[0].geometry
							}
						)
				);
		}.bind(this));
		this._window.anno.addHandler('onAnnotationRemoved', function(annotation){
			let annotations : Annotation[];
			annotations = this.annotations
			this.annotations =  _.reject(annotations , (a) => { return a.isEqualToDisplayedAnno(annotation) });
			console.log(this.annotations);
		}.bind(this));
		// this._window.anno.addHandler('onAnnotationUpdated', function(annotation){
		// 	updated_annotations[num_of_updated_annotations] = {
		// 		src : img_src,
		// 		text : annotation.text,
		// 		shapes : annotation.shapes
		// 	};
		// 	num_of_updated_annotations++;
		// 	editAnnotationInArray(all_annos_array, annotation);
		// });
		// this._window.anno.addHandler('onSelectionStarted', (event)=> {if(annotate_by_click) {anno.stopSelection(); findAnnotationMargins(event, gray_img_element);}});
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