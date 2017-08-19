var mongoose = require('mongoose');

// PageAnnotation Schema
var pageAnnotationSchema = mongoose.Schema({
	page:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Page',
		required: true
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	annotations:[{
		text:{
			type: String,
			required: true
		},
		x:{
			type: Number,
			required: true
		},
		y:{
			type: Number,
			required: true
		},
		width:{
			type: Number,
			required: true
		},
		height:{
			type: Number,
			required: true
		},
		create_date:{
			type:Date,
			default: Date.now
		}
	}],
	create_date:{
		type:Date,
		default: Date.now
	}
});

var PageAnnotation = module.exports = mongoose.model('PageAnnotation', pageAnnotationSchema);

// Get PageAnnotations
module.exports.getPageAnnotations = function(callback, limit) {
	PageAnnotation.find(callback).limit(limit).populate('page').populate('user');
}

// Get a single pageAnnotation by id
module.exports.getPageAnnotationById = function(id, callback) {
	PageAnnotation.findById(id, callback).populate('page').populate('user');
}

// Add a PageAnnotation
module.exports.addPageAnnotation = function(pageAnnotation, callback) {
	PageAnnotation.create(pageAnnotation, callback);
}

// Update a pageAnnotation
module.exports.updatePageAnnotation = function(id, pageAnnotation, options, callback) {
	var query = {_id: id};
	var update = {}
	if (pageAnnotation.page) {
		update.page = pageAnnotation.page;
	}
	if (pageAnnotation.user) {
		update.user = pageAnnotation.user;
	}
	if (pageAnnotation.annotations) {
		update.annotations = pageAnnotation.annotations;
	}
	PageAnnotation.findOneAndUpdate(query, update, options, callback);
}

// Delete a pageAnnotation
module.exports.deletePageAnnotation = function(id, callback) {
	var query = {_id: id};
	PageAnnotation.remove(query, callback);
}