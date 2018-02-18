import { Coordinate } from "./Coordinates";

export class FreeDraw {
	text: String;
	num : number;
	points: [Coordinate];

	constructor(){
		this.points = [] as [Coordinate]
	}
}