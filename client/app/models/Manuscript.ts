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
			this.owner = data.owner;
			this.shared = data.shared;
			this.authoringName = data.authoringName;
			this.authoringRegion = data.authoringRegion;
			this.authoringDate = data.authoringDate;
			this.sourceName = data.sourceName;
			this.sourceDate = data.sourceDate;
			this.mainFieldOfStudy= data.mainFieldOfStudy;
			this.subFieldOfStudy = data.subFieldOfStudy;
			this.visualContentCategory = data.visualContentCategory;
			this.writingName = data.writingName;
			this.writingDate = data.writingDate;
			this.writingRegion= data.writingRegion;
			this.sourceRegion = data.sourceRegion;
			this.originalWritingMedia= data.originalWritingMedia;
			this.numberOfPages = data.numberOfPages;
			this.pageSize= data.pageSize;
			this.font = data.font;
			this.isComplete = data.isComplete;
			this.isFrontCoverExist = data.isFrontCoverExist;
			this.numberOfFrontCoverPages = data.numberOfFrontCoverPages;
			this.isBackCoverExist = data.isBackCoverExist;
			this.numberOfBackCoverPages= data.numberOfBackCoverPages;
		
			
		}
	}
}
