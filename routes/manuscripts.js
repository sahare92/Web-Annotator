var express = require('express');
var router = express.Router();
Manuscript = require('../models/manuscript');

router.get('/', function (req, res, next) {
	Manuscript.getManuscripts(req.query, function(err, manuscripts){
		if(err)
			next(err);
		else
			res.json(manuscripts);
	});
});

router.get('/:_id', function (req, res, next) {
	Manuscript.getManuscriptById(req.params._id,  function(err, manuscript){
		if(err)
			next(err);
		else
			res.json(manuscript);
	});
});

router.post('/', function (req, res, next) {
	var manuscript = req.body; // should validate

	Manuscript.addManuscript(manuscript, function(err, manuscript){
		if(err)
			next(err);
		else
			res.json(manuscript);
	});
});

router.put('/:_id', function (req, res, next) {
	var id = req.params._id
	var manuscript = req.body; // should validate
	Manuscript.updateManuscript(id, manuscript, {}, function(err, manuscript){
		if(err)
			next(err);
		else
			res.json(manuscript);
	});
});

router.delete('/:_id', function (req, res, next) {
	var id = req.params._id
	Manuscript.deleteManuscript(id, function(err, manuscript){
		if(err)
			next(err);
		else
			res.json(manuscript);
	});
});

module.exports = router;