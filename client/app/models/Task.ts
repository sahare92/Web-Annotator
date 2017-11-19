import { User } from './User';
import { PageAnnotation } from './PageAnnotation';

export class Task {
	_id: string;
	assigner: User;
	manuscript : string;
	page: string;
	annotator: User;
	verifier: User;
	pageAnnotation : PageAnnotation;
	verified: Boolean;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.assigner = data.assigner;
			this.annotator = data.annotator;
			this.verifier = data.verifier;
			this.verified = data.verified;
			this.pageAnnotation = data.pageAnnotation;
			this.manuscript = data.manuscript;
			this.page = data.page;
		}
	}
}
