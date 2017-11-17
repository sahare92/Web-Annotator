import { User } from './User';
import { PageAnnotation } from './PageAnnotation';

export class Task {
	_id: Number;
	assigner: User;
	annotator: User;
	verifier: User;
	pageAnnotation : PageAnnotation
	verified: Boolean;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.assigner = data.assigner;
			this.annotator = data.annotator;
			this.verifier = data.verifier;
			this.verified = data.verified;
			this.pageAnnotation = data.pageAnnotation;
		}
	}
}
