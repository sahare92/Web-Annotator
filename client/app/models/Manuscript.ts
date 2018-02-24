export class Manuscript {
	_id: string;
	name: string;
	owner:string;
	shared: string[];
	authoring: {
		name: string;
		date: Date;
		country: string;
	};
	main_field_of_study: string;
	sub_field_of_study: string;
	visual_content_category: string;
	writing: {
		name: string;
		date: Date;
		country: string;
	};
	source: {
		name: string;
		date: Date;
		country: string;
	};
	original_writing_media: string;
	number_of_pages: Number;
	page_size: string;
	font: string;
	is_complete: Boolean;
	number_of_front_cover_pages: Number;
	number_of_back_cover_pages: Number;
	known_copies: [
		{
			archive_name: string;
			country: string;
			writing: {
				name: string;
				date: Date;
				country: string;
			}
		}
	];
	known_revisions: [
		{
			revision_author: {
				name: string;
				date: Date;
				country: string;
			},
			publisher: string;
		}
	];

	constructor(data){
		if(data != null){
			this._id = data._id;
			this.name = data.name;
			this.owner = data.owner;
			this.shared = data.shared;
			if (data.authoring)
				this.authoring = data.authoring;
			this.main_field_of_study = data.man_field_of_study;
			this.sub_field_of_study = data.sub_field_of_study;
			this.visual_content_category = data.visual_content_category;
			if (data.writing)
				this.writing = data.writing;
			if (data.source)
				this.source = data.source;
			this.original_writing_media = data.original_writing_media;
			this.number_of_pages = data.number_of_pages;
			this.page_size = data.page_size;
			this.font = data.font;
			this.is_complete = data.is_complete;
			this.number_of_front_cover_pages = data.number_of_front_cover_pages;
			this.number_of_back_cover_pages = data.number_of_back_cover_pages;
			this.known_copies = data.known_copies;
			this.known_revisions = data.known_revisions;
		}
		else {
			this.authoring = { name: null, date: null, country: null };
			this.writing = { name: null, date: null, country: null };
			this.source = { name: null, date: null, country: null };
		}
	}
}
