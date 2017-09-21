import { User } from './User';
import { Page } from './Page';
import { Annotation } from './Annotation';

export class PageAnnotation {
	_id: String;
	page: Page;
	user: User;
	annotations: [
		Annotation
	];

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.page = data.page;
			this.user = data.user;
			this.annotations = data.annotations;
		}
	}
}