import { User } from './User';
import { Page } from './Page';
import { Annotation } from './Annotation';
import {FreeDraw} from './FreeDraw'

export class PageAnnotation {
	_id: String;
	page: Page;
	user: User;
	annotations: [
		Annotation
	];
	freeDraws:[
		FreeDraw
	];

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.page = data.page;
			this.user = data.user;
			this.annotations = data.annotations;
			this.freeDraws = data.freeDraws;
		}
	}
}