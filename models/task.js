var mongoose = require('mongoose');
var Manuscript = require('./manuscript')
var User = require('./user')
var PageAnnotation = require('./pageAnnotation')
var Page = require('./page');
var ModelsHelper = require('./modelsHelper');
var generateDeepDeleteFunction = ModelsHelper.generateDeepDeleteFunction;
var InheritingCollections = [
	{
		name: "Page",
		ref: Page
    }
    ,	
    {
		name: "User",
		ref: User
    },
    {
		name: "Manuscript",
		ref: Manuscript
    },
    {
        name: "PageAnnotation",
        ref: PageAnnotation
	},
	
    
];

var taskSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	manuscript:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Manuscript',
		required: false
	},
	page:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Page',
		required: false
    },
    pageAnnotation:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'PageAnnotation',
		required: false
    },

	create_date:{
		type:Date,
		default: Date.now
	},
	worker: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false 
		}
	,
	role: 
		{
			type: String,
			required: false
		}
    ,
    owner: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false 
        },
    status:{
        type: String,
        default: "In progress"
    },
    note:{
        type:String,
        
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