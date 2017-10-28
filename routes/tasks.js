var express = require('express');
var router = express.Router();
Task = require('../models/task');

router.get('/', function (req, res, next) {
	Task.getTasks(req.query, function(err, tasks){
		if(err)
			next(err);
		else
			res.json(tasks);
	});
});

router.post('/', function (req, res, next) {
	var task = req.body; // should validate

	Task.addTask(task, function(err, task){
		if(err)
			next(err);
		else
			res.json(task);
	});
});


/** 
router.put('/:_id', function (req, res, next) {
	var id = req.params._id
	var page = req.body; // should validate
	Page.updatePage(id, page, {}, function(err, page){
		if(err)
			next(err);
		else
			res.json(page);
	});
});

router.delete('/:_id', function (req, res, next) {
	var id = req.params._id
	Page.deletePage(id, function(err, page){
		if(err)
			next(err);
		else
			res.json(page);
	});
});

**/

module.exports = router;