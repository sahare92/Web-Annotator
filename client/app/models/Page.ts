export class Page {
	_id: Number;
	manuscript: String;
	name: String;
	image: String;

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.manuscript = data.manuscript;
			this.name = data.name;
			this.image = data.image;
		}
	}
}