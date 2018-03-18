var express = require('express');
var router = express.Router();
Page = require('../models/page');

var fs = require("fs");
var mkdirp = require('mkdirp');
var multer = require('multer');
var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './temps/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });


router.get('/', function (req, res, next) {
	Page.getPages(req.query, function(err, pages){
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

router.post('/upload', upload.array("uploads[]", 12) ,function (req, res, next) {
	let manuscript = req.body['manuscript'];

	Page.uploadPages({ pages: req.files, manuscript: manuscript }, function(err, pagesInfo){
		if(err){
			next(err);
		}
		else{
			req.files.forEach(file => {
				mkdirp('statics/' + manuscript, function(err) {
					if (err) {
						next(new Error("Problem uploading new files"))
					}
					else {
						fs.copyFileSync('temps/' + file.filename, 'statics/' + manuscript + '/' + file.filename);
						fs.unlinkSync('temps/' + file.filename)
					}
				});
			});
			res.json({ success: true });
		}
	});
});

module.exports = router;