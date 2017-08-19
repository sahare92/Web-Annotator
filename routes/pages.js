var express = require('express');
var router = express.Router();
Page = require('../models/page');

router.get('/', function (req, res, next) {
	Page.getPages(function(err, pages){
		if(err)
			next(err);
		else
			res.json(pages);
	});
});

router.get('/:_id', function (req, res, next) {
	Page.getPageById(req.params._id,  function(err, page){
		if(err)
			next(err);
		else
			res.json(page);
	});
});

router.post('/', function (req, res, next) {
	var page = req.body; // should validate
	Page.addPage(page, function(err, page){
		if(err)
			next(err);
		else
			res.json(page);
	});
});

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

module.exports = router;