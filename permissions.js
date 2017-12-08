var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

// This function runs automatically before every server request
checkAuth = function(req, res, next){
				// console.log(req);
				// req.session.set('key', 'value');
				// console.log(req.session);
				// console.log('checkAuth ' + req.url);
				// console.log('cookies ' + req.cookies);

				// don't serve /secure to those not logged in
				// you should add to this list, for each and every secure url
				// if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
				// 	res.render('unauthorised', { status: 403 });
				// 	return;
				// }

				next();
			}

module.exports = { checkAuth }