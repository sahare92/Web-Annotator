var express = require('express');
var router = express.Router();
User = require('../models/user');

router.get('/', function (req, res, next) {
	User.getUsers(req.query, function(err, users){
		if(err)
			next(err);
		else
			res.json(users);
	});
});

router.get('/:_id', function (req, res, next) {
	User.getUserById(req.params._id,  function(err, user){
		if(err)
			next(err);
		else
			res.json(user);
	});
});

router.post('/', function (req, res, next) {
	var user = req.body; // should validate
	User.addUser(user, function(err, user){
		if(err)
			next(err);
		else
			res.json(user);
	});
});

router.put('/:_id', function (req, res, next) {
	var id = req.params._id
	var user = req.body; // should validate
	User.updateUser(id, user, {}, function(err, user){
		if(err)
			next(err);
		else
			res.json(user);
	});
});

router.delete('/:_id', function (req, res, next) {
	var id = req.params._id
	User.deleteUser(id, function(err, user){
		if(err)
			next(err);
		else
			res.json(user);
	});
});

module.exports = router;