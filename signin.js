var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();
var signinController = require('../controller/signinController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    signinController.getList(req, res);
});

router.post('/', function(req, res, next) {
    signinController.saveResponse(req, res);
});

module.exports = router;
