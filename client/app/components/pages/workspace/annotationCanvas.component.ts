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
import {DomSanitizer} from '@angular/platform-browser'
import * as _ from 'underscore';


@Component({
  moduleId: module.id,
  selector: 'annotation-canvas',
  templateUrl: '../../../../../templates/annotationCanvas.component.html',
  //styleUrls: ['../../../../../styles/workspace.css']
})

export class AnnotationCanvasComponent implements OnInit {
  
	@Input() user: User;
	@Input() page: Page;
	@Input() pageAnnotation: PageAnnotation;
	@Input() annotations: Annotation[];
	@Input() displayedAnnotations: DisplayedAnnotation[];
	imageElement: HTMLImageElement;
	annotationElement: HTMLDivElement;
	textCanvas: HTMLCanvasElement;
	mainDiv: HTMLDivElement;
	showingText: Boolean;
    annoObject; /* The current pageAnnotation controller object */
    sanitizer: DomSanitizer;
    constructor(snnitizer: DomSanitizer){
        this.sanitizer = snnitizer;
        this.ngOnInit();
       
    }
    ngOnInit(){
       
        
    }
    sani(){
        this.sanitizer.bypassSecurityTrustResourceUrl(this.page.image.toString())
    }
}
