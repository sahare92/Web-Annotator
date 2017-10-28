export class Task {
	_id: string;
	name: string;
    owner:string;
	annotator: string;
	verifyer:string;
    manuscript:string
    page:string;
    status: string;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.name = data.name;
			this.owner = data.owner;
			this.annotator = data.annotator;
			this.verifyer = data.verifyer;
			this.manuscript = data.manuscript;
			this.page = data.page;
            this.status = data.status;
        }
	}
}