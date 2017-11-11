var mongoose = require('mongoose');
var Manuscript = require('./manuscript')
var User = require('./user')
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
	assigner: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true 
		}
	,
	annotator: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true 
		}
	,
	verifier: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
	Task.find(options, callback);
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
		update.name = task.annotator;
	}
	if (task.verifier) {
		update.name = task.verifier;
	}
	if (task.verified) {
		update.name = task.verified;
	}
	Task.findOneAndUpdate(query, update, options, callback);
}