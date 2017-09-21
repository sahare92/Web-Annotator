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

// Used to display load annotation using the Annotorious library
export class DisplayedAnnotation {
	_id: String;
	src: String;
	text: String;
	shapes: [
		{
			type: String,
			geometry: {
				x: Number,
				y: Number,
				width: Number,
				height: Number
			}
		}
	]

	constructor(data, imageSrc){
		if(data != null){
			this._id = data._id;
			this.text = data.text;
			this.src = imageSrc;
			this.shapes = [
				{
					type: 'rect',
					geometry: data.geometry	
				}
			];
		}
	}
}