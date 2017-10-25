var express = require('express');
var router = express.Router();
Manuscript = require('../models/manuscript');

router.get('/', function (req, res, next) {
	Manuscript.getManuscripts(function(err, manuscripts){
		if(err)
			next(err);
		else{
		var mans = [];
		var usr;
		User.getLoggedUser(req, function(b, a){
			usr = a;
			console.log("==============")
			console.log(a)
			manuscripts.forEach(function(element) 
			{
				
			
				if(element.shared && element.owner){
					console.log(element)
					try{
						if (element.owner.valueOf() == a._id.toString().valueOf()  | element.shared.indexOf(a._id.toString()) > -1 ){
							mans.push(element)
						}
					}
					catch (e)
					{
						console.log(e)
					}

				}
		

			}, this);
			res.json(mans);
		})
		
		}

	});
});

router.get('/:_id', function (req, res, next) {
	Manuscript.getManuscriptById(req.params._id,  function(err, manuscript){
		if(err)
			next(err);
		else{
			res.json(manuscript)
		}
		
			
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