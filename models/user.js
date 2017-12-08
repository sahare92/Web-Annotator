var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	family_name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	affiliation:{
		type: String,
		required: true
	},
	role:{  // ['admin', 'none']
		type: String,		
		required: true
	},
	authorized:{
		type:Boolean,
		default: false
	},
	create_date:{
		type:Date,
		default: Date.now
	}
});

var User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback, limit) {
	User.find(callback).limit(limit);
}

// Get a single user by id
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

// Add a user
module.exports.addUser = function(user, callback) {
	user.password = encryptPassword(user.password);
	User.create(user, callback);
}

// Update a user
module.exports.updateUser = function(id, user, options, callback) {
	var query = {_id: id};
	var update = {}
	if (user.name) {
		update.name = user.name;
	}
	if (user.family_name) {
		update.family_name = user.family_name;
	}
	if (user.password) {
		update.password = encryptPassword(user.password);
	}
	if (user.email) {
		update.email = user.email;
	}
	if (user.affiliation) {
		update.affiliation = user.affiliation;
	}
	if (user.role) {
		update.role = user.role;
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete a user
module.exports.deleteUser = function(id, callback) {
	var query = {_id: id};
	User.remove(query, callback);
}

// Returns the session's user if it exists
module.exports.getLoggedUser = function(req, callback) {
	if (req.session.loggedUserEmail){
		User.find({ email: req.session.loggedUserEmail }, function(err, obj){
			if(err){
				callback(new Error());
			}
			else{
				currentUser = {};
				if (obj.length){
					currentUser = obj[0];
					callback(null, currentUser);
				}
				else{
					error = new Error("The user in the session doesn't longer exist");
					error.status = 401;
					callback(error);
				}
			}
		});
	}
	else{
		error = new Error("There is no logged user");
		error.status = 401;
		callback(error);
	}
}

module.exports.logOutUser = function(req, callback) {
	req.session.loggedUserEmail = null;
	callback(null, null);
}

// Checks if a user has the right email and pass to log in
module.exports.loginUser = function(req, callback) {
	// First find the user with the email and then check if the password is correct
	query = req.body;
	emailQuery = { email: query.email }; 
	User.find( emailQuery, function(err, obj){
		if(err){
			callback(new Error());
		}
		else {
			if (obj.length){
				matchingUser = obj[0];
				// Check that the password matches
				if (bcrypt.compareSync(query.password, matchingUser.password)){
					req.session.loggedUserEmail = matchingUser.email;
					callback(null, matchingUser);
				}
				else{
					error = new Error("Incorrect password");
					error.status = 401;
					callback(error);
				}
			}
			else {
				error = new Error("Incorrect email address");
				error.status = 401;
				callback(error);
			}
		}
	});
}

var encryptPassword = function(password){
	// Encrypt the password and save the hash
	var salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}