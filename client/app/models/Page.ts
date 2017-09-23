export class Page {
	_id: Number;
	manuscript: String;
	number: Number;
	image: String;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.manuscript = data.manuscript;
			this.number = data.number;
			this.image = data.image;
		}
	}
}