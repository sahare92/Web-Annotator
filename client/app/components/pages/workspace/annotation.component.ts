import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../models/Page';
import { Annotation, DisplayedAnnotation } from '../../../models/Annotation';
import { PageAnnotation } from '../../../models/PageAnnotation';
import { Manuscript } from '../../../models/Manuscript';
import { ManuscriptsService } from '../../../services/manuscript.service';
import { WindowService } from '../../../services/window.service';
import { WindowConAnno } from '../../../models/WindowConAnno';
import { FreeDraw } from '../../../models/FreeDraw'
import { Component, Injectable, Input, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { link } from 'fs';

@Component({
  moduleId: module.id,
  selector: 'annotation',
  templateUrl: '../../../../../templates/annotation.component.html',
  styleUrls: ['../../../../../styles/workspace.css']
})

export class AnnotationComponent implements OnInit {
	@Input() page: Page;
	@Input() pageAnnotation: PageAnnotation;
	annotations: Annotation[];
	displayedAnnotations: DisplayedAnnotation[];
	imageElement: HTMLImageElement;
	annotationElement: HTMLDivElement;
	textCanvas: HTMLCanvasElement;
	freeDrawCanvas: HTMLCanvasElement;
	mainDiv: HTMLDivElement;
	showingText: Boolean;
	annoObject; /* The current pageAnnotation controller object */
	_window: WindowConAnno;
	isFreeDraw:boolean;
	isPainting:boolean;
	ctx: CanvasRenderingContext2D;
	currentPointInDraw: any;
	currentFreeDrawLineText :String;
	currentFreeDrawLineNum: number;
	allFreeDrawLines : [FreeDraw]
	currentFreeDrawLine : FreeDraw
	
	constructor(private windowService: WindowService, private manuscriptsService: ManuscriptsService){
		this._window = windowService.nativeWindow;
	}

	saveFreeDrawLine(){
		this.currentFreeDrawLine.text = this.currentFreeDrawLineText
	}
	toggleFreeDraw(){
		this.isFreeDraw = !this.isFreeDraw;
	}
	saveAllFreeDraw(){
		//Saves all of the canvas's free draws
		this.manuscriptsService.updatePageAnnotaion(this.pageAnnotation._id, { freeDraws: this.allFreeDrawLines })
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
	getLineNumber(){
		let num = this.currentFreeDrawLineNum + 1;
		return "Line "+ num.toString
	}

	createFreeDrawCanvas(){
		this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer")
		document.getElementById("draw-layer").onmousedown = this.startFreeDraw.bind(this)
		document.getElementById("draw-layer").onmousemove = this.duringPaint.bind(this)
		document.getElementById("draw-layer").onmouseup = this.stopFreeDraw.bind(this)
	}

	ngOnInit() {
		this._window.anno.reset();
		this.showingText = false;
		this.imageElement = document.getElementById('anno-img') as HTMLImageElement;
		this.mainDiv = document.getElementById('main_div') as HTMLDivElement;
		this.isFreeDraw = false;
		this.textCanvas = <HTMLCanvasElement> document.getElementById("text-layer");
		this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer")
		this.isPainting = false
		this.ctx = null;
		this.currentPointInDraw = null;
		this.annotations = [];
		this.displayedAnnotations = [];
		this.currentFreeDrawLineText = "Enter text for line"
		this.allFreeDrawLines = this.pageAnnotation.freeDraws;
		this.currentFreeDrawLineNum = 1;	
		if(this.pageAnnotation){
			this.allFreeDrawLines = this.pageAnnotation.freeDraws
		}
		if (this.allFreeDrawLines.length == 0){
			this.addFreeDrawAnno()
		}
		this.currentFreeDrawLine = this.allFreeDrawLines[0]
	}
	addFreeDrawAnno(){
		//Creates a new line, and checking if maximum was reached
		if (this.allFreeDrawLines.length >= 255){
			alert("Max number of allFreeDrawLines reached!!")
		}
		let lastAnnoNum = this.allFreeDrawLines.length + 1 
		let newLine = new FreeDraw()
		newLine.num = lastAnnoNum
		newLine.text = ""
		this.allFreeDrawLines.push(newLine)
		// making the new line to be the current line
		this.currentFreeDrawLine = newLine
		this.currentFreeDrawLineText = newLine.text
		this.currentFreeDrawLineNum = newLine.num
	}
	startFreeDraw(event){
		this.isPainting = true;
		this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer")
		this.ctx = <CanvasRenderingContext2D> this.freeDrawCanvas.getContext("2d");
	}
	selectLine(l){
		this.currentFreeDrawLineText = l.text;
		this.currentFreeDrawLineNum = l.num
		this.currentFreeDrawLine = l
	}
	stopFreeDraw(event){
		this.isPainting = false ;
		this.currentPointInDraw = null;
	}

	 midPointBtw(p1, p2) {
		return {
		  x: p1.x + (p2.x - p1.x) / 2,
		  y: p1.y + (p2.y - p1.y) / 2
		};
  }

	duringPaint(event){
		/**
		 * Chacking if the mouse is down and painting
		 */
		if (!this.isPainting){
			return;
		}
		else {
			//recieving the current canvas and context 
			this.freeDrawCanvas = <HTMLCanvasElement> document.getElementById("draw-layer") 
			this.imageElement = document.getElementById('anno-img') as HTMLImageElement;
			this.ctx = <CanvasRenderingContext2D> this.freeDrawCanvas.getContext("2d");
			this.ctx.beginPath();
			let marginLeft = this.freeDrawCanvas.style.marginLeft.replace("px", "");
			let marginTop = this.imageElement.style.marginTop.replace("px",  ""); 
			var rect = this.freeDrawCanvas.getBoundingClientRect();
			this.ctx.lineWidth = 5;
			this.ctx.lineJoin = this.ctx.lineCap = 'round';
			let color = this.currentFreeDrawLine.num .toString(16)+"000"
			if (this.currentFreeDrawLine.num < 16){
				color += "00"
			}
			//setting the color by the line number
			color = "#"+ color
			this.ctx.fillStyle = color
			this.ctx.strokeStyle = color
			// End of the move to UI region
			let relX = (event.clientX - rect.left) / (rect.right-rect.left) * this.freeDrawCanvas.width
			let relY = (event.clientY - rect.top) /  (rect.bottom-rect.top) * this.freeDrawCanvas.height
			var p1 = {x: relX, y: relY}
			if (this.currentPointInDraw){
				//creating a line between this point to next and quadratic curve to the midway.
				this.ctx.beginPath()
				this.ctx.moveTo(this.currentPointInDraw.x, this.currentPointInDraw.y);
				
				let midPoint=  {
					x: p1.x + (this.currentPointInDraw.x - p1.x) / 2,
					y: p1.y + (this.currentPointInDraw.y - p1.y) / 2
				}
				this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
				this.ctx.lineTo(p1.x, p1.y)
			}
			//stroking the actual line and moving the current point to the end of the line 
			this.currentPointInDraw = p1;
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}	
	initTextCanvas() {
		this.textCanvas = <HTMLCanvasElement> document.getElementById("text-layer");
		this.textCanvas.width = this.imageElement.width;
		this.textCanvas.height = this.imageElement.height;
		document.getElementById("draw-layer").style.marginTop = this.imageElement.style.marginTop;
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
		this.createFreeDrawCanvas()
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

		// Prevent double loading of annotations
		if(this.displayedAnnotations.length > 0)
			return

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