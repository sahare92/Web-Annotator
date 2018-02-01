var express = require('express');
var router = express.Router();
const app = express();
const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());

// Main route
router.get(/^(?!.*\bapi\b).*$/i, function (req, res) {  // regexp excluding /api routes
	res.render('index.html');
});

module.exports = router;