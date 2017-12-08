var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/user')

// This function runs automatically before every server request
checkAuth = async function(req, res, next){

				// get the user of the session
				user = null;
				if (req.session && req.session.loggedUserEmail)
					user = await User.find({ email: req.session.loggedUserEmail });

				// block unauthorized routes for the given user
				switch (req.path) {
					case '/approve':
						if (user.role != 'admin')
							res.status(401).send('Reached unauthorized page');
						return;
					case '/manuscripts':
						if (!user) {
							res.status(401).send('Reached unauthorized page');
							return;
						}
					case '/workspace':
						if (!user) {
							res.status(401).send('Reached unauthorized page');
							return;
						}
				}

				req.user = user;  // to be used along the rest of the middleware

				next();
			}

module.exports = { checkAuth }