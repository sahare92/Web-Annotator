var express = require('express');
var router = express.Router();
Annotation = require('../models/annotation');

router.get('/', function (req, res, next) {
	Annotation.getAnnotations(function(err, annotations){
		if(err)
			next(err);
		else
			res.json(annotations);
	});
});

router.get('/:_id', function (req, res, next) {
	Annotation.getAnnotationById(req.params._id,  function(err, annotation){
		if(err)
			next(err);
		else
			res.json(annotation);
	});
});

router.post('/', function (req, res, next) {
	var annotation = req.body; // should validate
	Annotation.addAnnotation(annotation, function(err, annotation){
		if(err)
			next(err);
		else
			res.json(annotation);
	});
});

router.put('/:_id', function (req, res, next) {
	var id = req.params._id
	var annotation = req.body; // should validate
	Annotation.updateAnnotation(id, annotation, {}, function(err, annotation){
		if(err)
			next(err);
		else
			res.json(annotation);
	});
});

router.delete('/:_id', function (req, res, next) {
	var id = req.params._id
	Annotation.deleteAnnotation(id, function(err, annotation){
		if(err)
			next(err);
		else
			res.json(annotation);
	});
});

module.exports = router;