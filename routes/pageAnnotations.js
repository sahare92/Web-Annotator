var express = require('express');
var router = express.Router();
PageAnnotation = require('../models/pageAnnotation');

router.get('/', function (req, res, next) {
	PageAnnotation.getPageAnnotations(req.query, function(err, pageAnnotations){
		if(err)
			next(err);
		else
			res.json(pageAnnotations);
	});
});

router.get('/:_id', function (req, res, next) {
	PageAnnotation.getPageAnnotationById(req.params._id,  function(err, pageAnnotation){
		if(err)
			next(err);
		else
			res.json(pageAnnotation);
	});
});

router.post('/', function (req, res, next) {
	var pageAnnotation = req.body; // should validate
	PageAnnotation.addPageAnnotation(pageAnnotation, function(err, pageAnnotation){
		if(err)
			next(err);
		else
			res.json(pageAnnotation);
	});
});

router.put('/:_id', function (req, res, next) {
	var id = req.params._id
	var pageAnnotation = req.body; // should validate
	PageAnnotation.updatePageAnnotation(id, pageAnnotation, {}, function(err, pageAnnotation){
		if(err)
			next(err);
		else
			res.json(pageAnnotation);
	});
});

router.delete('/:_id', function (req, res, next) {
	var id = req.params._id
	PageAnnotation.deletePageAnnotation(id, function(err, pageAnnotation){
		if(err)
			next(err);
		else
			res.json(pageAnnotation);
	});
});

module.exports = router;