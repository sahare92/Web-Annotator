var mongoose = require('mongoose');
var PageAnnotation = require('./pageAnnotation');
var ModelsHelper = require('./modelsHelper');
var generateDeepDeleteFunction = ModelsHelper.generateDeepDeleteFunction;
var InheritingCollections = [
	{
		name: "PageAnnotation",
		ref: PageAnnotation
	}
];

// Page Schema
var pageSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	manuscript:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Manuscript',
		required: true
	},
	image:{
		type: String,
		required: true
	},
	create_date:{
		type:Date,
		default: Date.now
	},
	annotators: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false 
		}
	],
	verifiers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false 
		}
	]
});

var Page = module.exports = mongoose.model('Page', pageSchema);

// Get Pages
module.exports.getPages = function(query, callback, limit) {
	options = {};
	if(query)
		options = query;
	Page.find(options, callback).limit(limit).populate('manuscript');
}

// Get a single page by id
module.exports.getPageById = function(id, callback) {
	Page.findById(id, callback).populate('manuscript');
}

// Add a Page
module.exports.addPage = function(page, callback) {
	Page.create(page, callback);
}

// Update a page
module.exports.updatePage = function(id, page, options, callback) {
	var query = {_id: id};
	var update = {}
	if (page.name) {
		update.name = page.name;
	}
	if (page.image) {
		update.image = page.image;
	}
	if (page.collection) {
		update.collection = page.collection;
	}
	if(page.annotators){
		update.annotators = page.annotators;
	}
	if (page.verifiers){
		update.verifiers = package.verifiers;
	}
	Page.findOneAndUpdate(query, update, options, callback);
}

// Delete a page
module.exports.deletePage = function(id, callback) {
	this.destroy(id, callback);
}

module.exports.destroy = function(id, callback) {
	var childQuery = {page: id};
	var fatherQuery = {_id: id};
	var removedInheritingCollections = { count: 0 , total: InheritingCollections.length };
	var removeFatherCallback = function () {
		Page.remove(fatherQuery, callback);
	}
	InheritingCollections.forEach( function(inheritingCol) {
		inheritingCol.ref.find(childQuery, generateDeepDeleteFunction(inheritingCol.name, inheritingCol.ref, removedInheritingCollections, removeFatherCallback));
	});
}