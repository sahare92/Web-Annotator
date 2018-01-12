var express = require('express');
var router = express.Router();
PageAnnotation = require('../models/pageAnnotation');
var fs = require("fs")
var mkdirp = require('mkdirp');
var busboy = require('connect-busboy'); 
var payload = require('request-payload');
var multer  = require('multer')
var upload = multer({ dest: 'temps/' })
var type = upload.single(name="uploadFile");


router.get('/', function (req, res, next) {
	PageAnnotation.getPageAnnotations(req.query, function(err, pageAnnotations){
		if(err)
			next(err);
		else
			res.json(pageAnnotations);
	});
});

router.post('/file/:_id',type ,function(req,res,next){	
	PageAnnotation.fileUpdate(req.params._id, function(pageAnnotation){
		fs.readdir('temps', (err, files) => {
			files.forEach(file => {
			  console.log(file);
			  mkdirp('depository/' + pageAnnotation._id +'/', function(err){
				  if (err){
					r = {result:'ilan'}
					res.json(r).send()
				  }
				  else{
					fs.copyFileSync('temps/' + file , 'depository/' + pageAnnotation._id+ '/' + 'canvas.png')
					fs.unlinkSync('temps/' + file)
					r = {result:'shechter'}
					console.log("OK")
					res.json(r).send()
				}
			  }) 
			});
		  })
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