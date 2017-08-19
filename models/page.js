var mongoose = require('mongoose');

// Page Schema
var pageSchema = mongoose.Schema({
	number:{
		type: Number,
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
	}
});

var Page = module.exports = mongoose.model('Page', pageSchema);

// Get Pages
module.exports.getPages = function(callback, limit) {
	Page.find(callback).limit(limit).populate('manuscript');
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
	if (page.number) {
		update.number = page.number;
	}
	if (page.image) {
		update.image = page.image;
	}
	if (page.collection) {
		update.collection = page.collection;
	}
	Page.findOneAndUpdate(query, update, options, callback);
}

// Delete a page
module.exports.deletePage = function(id, callback) {
	var query = {_id: id};
	Page.remove(query, callback);
}

module.exports.destroy = function(id ,callback) {
	var query = {_id: id};
	Page.remove(query, callback);
}