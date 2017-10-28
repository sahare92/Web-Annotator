export class Task {
	_id: string;
	name: string;
    owner:string;
	worker: string;
	role:string;
    manuscript:string
    page:string;
    status: string;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.name = data.name;
			this.owner = data.owner;
			this.worker = data.worker;
			this.role = data.role;
			this.manuscript = data.manuscript;
			this.page = data.page;
            this.status = data.status;
        }
	}
}