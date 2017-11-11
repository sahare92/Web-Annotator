export class Manuscript {
	_id: string;
	name: string;
	src: string;
	owner:string;
	shared: string[];
	authoringName: string;
	authoringDate: Date;
	authoringRegion: string;
	mainFieldOfStudy: string;
	subFieldOfStudy: string;
	visualContentCategory: string;
	writingName: string;
	writingDate: Date;
	writingRegion: string;
	sourceName: string;
	sourceDate: Date;
	sourceRegion: string;
	originalWritingMedia: string;
	numberOfPages: number;
	pageSize: string;
	font: string;
	isComplete: boolean;
	isFrontCoverExist: boolean;
	numberOfFrontCoverPages: number;
	isBackCoverExist: boolean;
	numberOfBackCoverPages: number;





	constructor(data){
		if(data != null){
			this._id = data._id;
			this.name = data.name;
			this.src = data.src;

		}
	}
}
