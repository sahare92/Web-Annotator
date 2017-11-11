import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../models/Page';
import { User } from '../../../models/User';
import { Annotation, DisplayedAnnotation } from '../../../models/Annotation';
import { PageAnnotation } from '../../../models/PageAnnotation';
import { Manuscript } from '../../../models/Manuscript';
import { ManuscriptsService } from '../../../services/manuscript.service';
import { UsersService } from '../../../services/users.service';
import { WindowService } from '../../../services/window.service';
import { WindowConAnno } from '../../../models/WindowConAnno';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'annotation',
  templateUrl: '../../../../../templates/annotation.component.html',
  styleUrls: ['../../../../../styles/workspace.css']
})

export class AnnotationComponent implements OnInit {
	@Input() user: User;
	@Input() page: Page;
	@Input() pageAnnotation: PageAnnotation;
	@Input() annotations: Annotation[];
	@Input() displayedAnnotations: DisplayedAnnotation[];
	imageElement: HTMLImageElement;
	annotationElement: HTMLDivElement;
	textCanvas: HTMLCanvasElement;
	freeDrawCanvas: HTMLCanvasElement;
	mainDiv: HTMLDivElement;
	showingText: Boolean;
	annoObject; /* The current pageAnnotation controller object */
	_window: WindowConAnno;
	freeDraw:boolean;
	isPainting:boolean;
	ctx: CanvasRenderingContext2D;
	freeDrawAnnoArray: any[]
	currentPointInDraw: any;
	

	constructor(private windowService: WindowService, private usersService: UsersService, private manuscriptsService: ManuscriptsService){
		this._window = windowService.nativeWindow;
	}
	toggleFreeDraw(){
		this.freeDraw = !this.freeDraw
		console.log(this.freeDraw)
		
	}
	createFreeDrawCanvas(){
		this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer")
		document.getElementById("draw-layer").onmousedown = this.startFreeDraw
		document.getElementById("draw-layer").onmousemove = this.duringPaint
		document.getElementById("draw-layer").onmouseup = this.stopFreeDraw
	}
	ngOnInit() {
		this._window.anno.reset();
		this.showingText = false;
		this.imageElement = document.getElementById('anno-img') as HTMLImageElement;
		this.mainDiv = document.getElementById('main_div') as HTMLDivElement;
		this.freeDraw = true;
		this.textCanvas = <HTMLCanvasElement> document.getElementById("text-layer");
		if (this.freeDraw){
			this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer")
		}
		this.isPainting = false
		
		this.ctx = null;
		this.freeDrawAnnoArray = [];
		this.currentPointInDraw = null;
		
		
	}
	startFreeDraw(event){
		this.isPainting = true;
		this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer")
		console.log(this.freeDrawCanvas)
		this.ctx = <CanvasRenderingContext2D> this.freeDrawCanvas.getContext("2d");
		console.log("is painting..")
	}
	stopFreeDraw(event){
		this.isPainting = false ;
		this.currentPointInDraw = null;
		console.log("is not painting..")
	}
	beginAnno(){
		console.log("Initing Anno")
		var freeDrawAnno = []
		this.freeDrawAnnoArray.push(freeDrawAnno);
		console.log(this.freeDrawAnnoArray)
	}
	 midPointBtw(p1, p2) {
		return {
		  x: p1.x + (p2.x - p1.x) / 2,
		  y: p1.y + (p2.y - p1.y) / 2
		};
  }

	duringPaint(event){
		if (!this.isPainting){
			return;
		}
		else {
			this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer") 
			this.imageElement = document.getElementById('anno-img') as HTMLImageElement;
			
			this.ctx = <CanvasRenderingContext2D> this.freeDrawCanvas.getContext("2d");
			
		
			this.ctx.beginPath();
			
			let marginLeft = this.freeDrawCanvas.style.marginLeft.replace("px", "");
			let marginTop = this.imageElement.style.marginTop.replace("px",  ""); 


			//TODO: move this next lines and on of color to be controlled by ui
			var rect = this.freeDrawCanvas.getBoundingClientRect();
			this.ctx.lineWidth = 5;
			this.ctx.lineJoin = this.ctx.lineCap = 'round';
			// End of the move to UI region


			let relX = (event.clientX - rect.left) / (rect.right-rect.left) * this.freeDrawCanvas.width
			let relY = (event.clientY - rect.top) /  (rect.bottom-rect.top) * this.freeDrawCanvas.height

			var p1 = {x: relX, y: relY}
			
			if (this.currentPointInDraw){
				//Drawing a line between this point to next and quadratic curve to the midway.
				this.ctx.beginPath()
				this.ctx.moveTo(this.currentPointInDraw.x, this.currentPointInDraw.y);
				
				let midPoint=  {
					x: p1.x + (this.currentPointInDraw.x - p1.x) / 2,
					y: p1.y + (this.currentPointInDraw.y - p1.y) / 2
				}

				this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
				this.ctx.lineTo(p1.x, p1.y)
				console.log("line between: ")
				console.log(this.currentPointInDraw)
				console.log(p1)

			}
			this.currentPointInDraw = p1;
			this.ctx.stroke();
			this.ctx.closePath();

			
			/*
				// we pick the point between pi+1 & pi+2 as the
				// end point and p1 as our control point
					var midPoint = this.midPointBtw(p1, p2);
					this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
				
				  // Draw last line as a straight line while
				  // we wait for the next point to be able to calculate
				  // the bezier control point
				  this.ctx.lineTo(p1.x, p1.y);
				  this.ctx.stroke();
		*/
		}
		
	}	
	initTextCanvas() {
		console.log("initing canvas")

		this.textCanvas = <HTMLCanvasElement> document.getElementById("text-layer");
		this.textCanvas.width = this.imageElement.width;
		this.textCanvas.height = this.imageElement.height;
		if (this.freeDraw)
		document.getElementById("draw-layer").style.marginTop = this.imageElement.style.marginTop;
		console.log(this.textCanvas)
	}

	getTextLayerMarginLeft() {
		
		if(this.annotationElement)
			return this.annotationElement.style.marginLeft;
		return '0px';
	}
	getTextLayerMarginTop() {
		
		if(this.annotationElement)
			return this.annotationElement.style.marginTop;
		return '0px';
	}
	getTextLayerMarginWidth() {
		
		if(this.annotationElement)
			return this.imageElement.width;
		return '0px';
	}
	getTextLayerMarginHeight() {
		
		if(this.annotationElement)
			return this.imageElement.height;
		return '0px';
	}

	initAnnotations() {

		this.initTextCanvas()
		// Load every annotation from the DB
		if (this.freeDraw){
			this.createFreeDrawCanvas()
		}
		console.log("created context..")
		
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
		this.annotationElement = document.getElementsByClassName('annotorious-annotationlayer')[0] as HTMLDivElement;
	}

	/* Show annotation text */

	loadAnnotationsText() {
		this.initTextCanvas();
		this.resetDraw("text-layer");
		this._window.anno.getAnnotations().forEach( (a)=> {
			let pos = this.getTextPosition(a);
			this.draw("text-layer",a.text,pos.left,pos.top);
		});
	}

	draw(canvasid, text, x, y) {
		var canvas = document.getElementById(canvasid) as HTMLCanvasElement;
		var ctx = canvas.getContext('2d');
		ctx.font = '25px serif';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 0.3;
		ctx.fillStyle = 'white';
		ctx.fillText(text, x, y);
		ctx.strokeText(text, x, y);
	}

	resetDraw(canvasid){
		var canvas = document.getElementById(canvasid) as HTMLCanvasElement;
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 10000, 10000); // 10,000 is a big enough num of pixels to clear :)
	}

	removeAnnotationFromArray( annos_array, annotation ) {
		var index = annos_array.findIndex((cur_anno) => (cur_anno.text == annotation.text && cur_anno.shapes == annotation.shapes))
		annos_array.splice(index,1); // remove the item from the array
	}
	addAnnotationToArray( annos_array, annotation ) {
		annos_array.push(annotation);
	}
	editAnnotationInArray( annos_array, annotation ) {
		var index = annos_array.findIndex((cur_anno) => cur_anno.shapes == annotation.shapes)
		annos_array[index].text = annotation.text;
	}
	// transforms the position from precents to pixels and returns the bottom-left corner
	getTextPosition(annotation) {
		var x = annotation.shapes[0].geometry.x*this.imageElement.width;
		var y = (annotation.shapes[0].geometry.y + annotation.shapes[0].geometry.height*0.7)*this.imageElement.height;
		return {left: x, top: y};
	}

	toggleShowText() {
		if (this.showingText){
			this.loadAnnotationsText();
		}
		this.showingText = !this.showingText; // for the next time the user clicks the button
	}
}