var mongoose = require('mongoose');
var Page = require('./page');
var ModelsHelper = require('./modelsHelper');
var generateDeepDeleteFunction = ModelsHelper.generateDeepDeleteFunction;
var InheritingCollections = [
	{
		name: "Page",
		ref: Page
	}
];

// Manuscript Schema
var manuscriptSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type:Date,
		default: Date.now
	},
	authoring: {
		name:{
			type: String
		},	
		date:{
			type: Date
		},
		country:{
			type: String
		}
	},
	main_field_of_study:{
		type: String
	},
	sub_field_of_study:{
		type: String
	},
	visual_content_category:{
		type: String
	},
	writing: {
		name:{
			type: String
		},	
		date:{
			type: Date
		},
		country:{
			type: String
		}			
	},
	source: {
		name:{
			type: String
		},	
		date:{
			type: Date
		},
		country:{
			type: String
		}			
	},
	original_writing_media:{
		type: String
	},
	number_of_pages:{
		type: Number
	},
	page_size:{
		type: String
	},
	font:{
		type: String
	},
	is_complete:{
		type: Boolean
	},
	number_of_front_cover_pages:{
		type: Number
	},	
	number_of_back_cover_pages:{
		type: Number
	},
	known_copies:[
		{
			archive_name: {
				type: String
			},	
			country: {
				type: String
			},
			writing: {
				name:{
					type: String
				},	
				date:{
					type: Date
				},
				country:{
					type: String
				}			
			}
		}
	],
	known_revisions:[
		{
			revision_author: {
				name:{
					type: String
				},	
				date:{
					type: Date
				},
				country:{
					type: String
				}			
			},
			publisher:{
				type: String
			}
		}
	],
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	shared:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'	
		}
	]
});

var Manuscript = module.exports = mongoose.model('Manuscript', manuscriptSchema);

// Get Manuscripts
module.exports.getManuscripts = function(query, callback, limit) {
	options = {};
	if(query)
		options = query;
	Manuscript.find(options, callback).limit(limit).populate('owner').populate('shared');
}

// Get a single manuscript by id
module.exports.getManuscriptById = function(id, callback) {
	Manuscript.findById(id, callback);
}

function convertObjectToDate(date) {
	return new Date(date.year + '-' + date.month + '-' + date.day);
}

// Add a Manuscript
module.exports.addManuscript = function(manuscript, callback) {
	manuscript.authoring.date = convertObjectToDate(manuscript.authoring.date);
	manuscript.writing.date = convertObjectToDate(manuscript.writing.date);
	manuscript.source.date = convertObjectToDate(manuscript.source.date);

	Manuscript.create(manuscript, callback);
}

// Update a manuscript
module.exports.updateManuscript = function(id, manuscript, options, callback) {
	var query = {_id: id};
	var update = {}
	if (manuscript.name) {
		update.name = manuscript.name;
	}
	Manuscript.findOneAndUpdate(query, update, options, callback);
}

// Delete a manuscript
module.exports.deleteManuscript = function(id, callback) {
	this.destroy(id, callback);
}

module.exports.destroy = function(id, callback) {
	var childQuery = {manuscript: id};
	var fatherQuery = {_id: id};
	var removedInheritingCollections = { count: 0 , total: InheritingCollections.length };
	var removeFatherCallback = function () {
		Manuscript.remove(fatherQuery, callback);
	}
	InheritingCollections.forEach( function(inheritingCol) {
		inheritingCol.ref.find(childQuery, generateDeepDeleteFunction(inheritingCol.name, inheritingCol.ref, removedInheritingCollections, removeFatherCallback));
	});
}