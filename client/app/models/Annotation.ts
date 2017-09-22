export class Annotation {
	text: String;
	geometry: {
		x: Number;
		y: Number;
		width: Number;
		height: Number;
	};

	constructor(data){
		if(data != null){
			this.text = data.text;
			this.geometry = data.geometry;
		}
	}

	isEqualToDisplayedAnno( displayedAnno: DisplayedAnnotation){
		let displayedGeometry = displayedAnno.shapes[0].geometry
		return this.isEqualGeometries(this.geometry, displayedGeometry) && this.text == displayedAnno.text;
	}

	isEqualGeometries(firstG, secondG){
		let res = true;
		if(firstG.x != secondG.x)
			res = false;
		else if(firstG.y != secondG.y)
			res = false;
		else if(firstG.width != secondG.width)
			res = false;
		else if(firstG.height != secondG.height)
			res = false;
		return res;
	}
}

// Used to display load annotation using the Annotorious library
export class DisplayedAnnotation {
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