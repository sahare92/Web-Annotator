export class Manuscript {
	_id: number;
	name: string;
	src: string;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.name = data.name;
			this.src = data.src;
		}
	}
}