var mongoose = require('mongoose');

// Annotation Schema
var annotationSchema = mongoose.Schema({
	pageAnnotation:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PageAnnotation',
		required: true
	},
	text:{
		type: String,
		required: true
	},
	geometry:{
		x: Number,
		y: Number,
		width: Number,
		height: Number
	},
	create_date:{
		type:Date,
		default: Date.now
	}
});

var Annotation = module.exports = mongoose.model('Annotation', annotationSchema);

// Get Annotations
module.exports.getAnnotations = function(callback, limit) {
	Annotation.find(callback).limit(limit).populate('page').populate('user');
}

// Get a single annotation by id
module.exports.getAnnotationById = function(id, callback) {
	Annotation.findById(id, callback).populate('page').populate('user');
}

// Add a Annotation
module.exports.addAnnotation = function(annotation, callback) {
	Annotation.create(annotation, callback);
}

// Update a annotation
module.exports.updateAnnotation = function(id, annotation, options, callback) {
	var query = {_id: id};
	var update = {}
	if (annotation.page) {
		update.page = annotation.page;
	}
	if (annotation.user) {
		update.user = annotation.user;
	}
	if (annotation.annotations) {
		update.annotations = annotation.annotations;
	}
	Annotation.findOneAndUpdate(query, update, options, callback);
}

// Delete a annotation
module.exports.deleteAnnotation = function(id, callback) {
	this.destroy(id, callback);
}

module.exports.destroy = function(id ,callback) {
	var query = {_id: id};
	Annotation.remove(query, callback);
}