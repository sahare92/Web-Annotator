import { User } from './User';

export class Task {
	_id: Number;
	assigner: User;
	annotator: User;
	verifier: User;
	verified: Boolean;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.assigner = data.assigner;
			this.annotator = data.annotator;
			this.verifier = data.verifier;
			this.verified = data.verified;
		}
	}
}
