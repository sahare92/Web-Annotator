var mongoose = require('mongoose');
var ModelsHelper = require('./modelsHelper');
var generateDeepDeleteFunction = ModelsHelper.generateDeepDeleteFunction;

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
	annotations:[
		{
			text:{
				type: String,
				required: true
			},
			geometry:{
				x: Number,
				y: Number,
				width: Number,
				height: Number
			}
		}
	],
	freeDraws:[
		{
			text:{
				type:String,
				required:true
			},
			num:{
				type:Number,
				required:true
			},
			points:[
				{
					x:{
						type:Number,
						required: false
					},
					y:{
						type:Number,
						required:false 

					}
				}
				
			]
		}
	],
	create_date:{
		type:Date,
		default: Date.now
	}
});

var PageAnnotation = module.exports = mongoose.model('PageAnnotation', pageAnnotationSchema);

// Get PageAnnotations
module.exports.getPageAnnotations = function(params, callback, limit) {
	options = {};
	if(params)
		options = params;
	PageAnnotation.find(options, callback).limit(limit).populate('page').populate('user');
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
	if (pageAnnotation.freeDraws){
		update.freeDraws = pageAnnotation.freeDraws;
	}
	PageAnnotation.findOneAndUpdate(query, update, options, callback);
}

// Delete a pageAnnotation
module.exports.deletePageAnnotation = function(id, callback) {
	this.destroy(id, callback);
}

module.exports.destroy = function(id, callback) {
	var query = {_id: id};
	PageAnnotation.remove(query, callback);
}
module.exports.fileUpdate = function(id, callback){
	PageAnnotation.findById(id,function (err, res) {
		console.log(res)
		callback(res)
	})
}