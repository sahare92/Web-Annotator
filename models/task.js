var mongoose = require('mongoose');
var Manuscript = require('./manuscript')

var PageAnnotation = require('./pageAnnotation')
var Page = require('./page');
var ModelsHelper = require('./modelsHelper');
var generateDeepDeleteFunction = ModelsHelper.generateDeepDeleteFunction;

var taskSchema = mongoose.Schema({
    pageAnnotation:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'PageAnnotation',
		required: false
    },
	create_date:{
		type:Date,
		default: Date.now
	},
	assigner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true 
	}
	,
	annotator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true 
	}
	,
	verifier: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true 
	}
	,
	manuscript: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Manuscript',
		required: true 
	}
	,
	page:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Page',
		required: true 
	}
	,
	verified:{
        type: Boolean,
        default: false
    }	
});

var Task = module.exports = mongoose.model('Task', taskSchema);

module.exports.getTasks = function(query, callback) {
	options = {};
	if(query)
		options = query;
	Task.find(options, callback)
	.populate("annotator")
	.populate("verifier")
	.populate("assigner")
	.populate("pageAnnotation")
	.populate("manuscript")
	.populate("page");
}

module.exports.getTaskById = function(id, callback) {
	Task.findById(id, callback);
}


module.exports.addTask = function(manuscript, callback) {
	Task.create(manuscript, callback);
}

module.exports.updateTask = function(id, task, options, callback) {
	var query = {_id: id};
	var update = {}
	if (task.annotator) {
		update.annotator = task.annotator;
	}
	if (task.verifier) {
		update.verifier = task.verifier;
	}
	if (task.verified != null) {
		update.verified = task.verified;
	}

	Task.findOneAndUpdate(query, update, options, callback);
}