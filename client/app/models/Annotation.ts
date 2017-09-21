export class Annotation {
	_id: String;
	text: String;
	geometry: {
		x: Number;
		y: Number;
		width: Number;
		height: Number;
	};

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.text = data.text;
			this.geometry = data.geometry;
		}
	}
}