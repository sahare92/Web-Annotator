import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../models/Page';
import { Annotation, DisplayedAnnotation } from '../../models/Annotation';
import { PageAnnotation } from '../../models/PageAnnotation';
import { ManuscriptsService } from '../../services/manuscript.service';
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
	loaded: Boolean;
	_window: WindowConAnno;

	constructor(private windowService: WindowService, private manuscriptsService: ManuscriptsService){
		this.loaded = false;
		this._window = windowService.nativeWindow;
		this.init();
	}

	init() {
		this.annotations = []
		this.displayedAnnotations = []
		this.initPage();
	}

	initPage() {
		this.manuscriptsService.getPageAnnotationByID('59d0dfc389799f557c4fab5f')
			.subscribe(
				res => {
					if (res) {
						this.pageAnnotation = res;
						this.page = res.page;
						this.loaded = true;
					}
				},
				err => {
					alert(err);
				}
			);
	}

	initAnnotations() {
		// Load every annotation from the DB
		this.pageAnnotation.annotations.forEach((a) => this.annotations.push(new Annotation(a)));
		this.loadAnnotorious();
		this.displayAnnotations();
		this.initHandlers();
	}

	initHandlers() {
		this._window.anno.addHandler('onAnnotationCreated', function(annotation){
			this.annotations.push(Annotation.copyDisplayedAnnotation(annotation));
		}.bind(this));
		this._window.anno.addHandler('onAnnotationRemoved', function(annotation){
			let annotations : Annotation[];
			annotations = this.annotations;
			this.annotations =  _.reject(annotations , (a) => { return a.isEqualToDisplayedAnno(annotation) });
		}.bind(this));
		this._window.anno.addHandler('onAnnotationUpdated', function(annotation){
			let annotations : Annotation[];
			annotations = this.annotations;
			let index = _.findIndex(annotations, (a) => { return a.isEqualToDisplayedAnno(annotation) })
			this.annotations[index] = Annotation.copyDisplayedAnnotation(annotation);
		}.bind(this));
		// this._window.anno.addHandler('onSelectionStarted', (event)=> {if(annotate_by_click) {anno.stopSelection(); findAnnotationMargins(event, gray_img_element);}});
	}

	displayAnnotations() {
		this.annotations.forEach((a) => {
			var displayedAnno = new DisplayedAnnotation(a, this.page.image);
			this.displayedAnnotations.push(
					displayedAnno
				);
			this._window.anno.addAnnotation(displayedAnno); // the method that actually adds the annotation to the displayed page
		});
	}

	saveAnnotations() {
		this.manuscriptsService.updatePageAnnotaion(this.pageAnnotation._id, { annotations: this.annotations })
			.subscribe(
				res => {
					if (res) {
						alert('saved!');
					}
				},
				err => {
					alert(err);
				}
			);
	}

	loadAnnotorious() {
		this.annoObject = this._window.anno.makeAnnotatable(document.getElementById('anno-img'));
	}
}