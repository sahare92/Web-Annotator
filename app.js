var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomstring = require('randomstring');
var expressSession = require('express-session');

var indexRoute = require('./routes/index');
var usersRoute = require('./routes/users');
var manuscriptsRoute = require('./routes/manuscripts');
var pagesRoute = require('./routes/pages');
var tasksRoute = require('./routes/tasks')
var pageAnnotationsRoute = require('./routes/pageAnnotations');
var loginRoute = require('./routes/login');
var permissions = require('./permissions');

var port = process.argv[2];
if(!port)
    port = 8000 // default port

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@localhost/web-annotator');
var db = mongoose.connection;

// initialize the cookie session
var sessionTime = 1000 * 60 * 60 * 24 * 7;
app.use(expressSession({
    secret: 'a4f8071f-c873123#12sadmKdasj12-4447-8ee2',
    cookie: { maxAge: sessionTime }, // a week
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose,
		saveUninitialized: false,
		resave: false,
        collection: 'sessions', 
        expire: sessionTime 
    })
}));

app.use(permissions.checkAuth);

// Static files MW
app.use('/depository', express.static('depository'))
app.use('/statics', express.static('statics'))
app.use('/uploads', express.static('uploads'))

// Routes MW
app.use('/', indexRoute);
app.use('/api/users', usersRoute);
app.use('/api/manuscripts', manuscriptsRoute);
app.use('/api/pages', pagesRoute);
app.use('/api/pageAnnotations', pageAnnotationsRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/login', loginRoute);

// Error Handler
app.use(function (err, req, res, next) {
    if (!err.message)
        err.message = "Internal server error";
    if (!err.status)
        err.status = 500;
    console.log(err.stack); // log the error to the terminal
    res.status(err.status).send(err.message);
});

app.listen(port);
console.log('Running on port ' + port + '...');