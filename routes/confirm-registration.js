var express = require('express');
var _bundles = require('../functions/_bundle');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/confirm-registration', function(req, res, next) {
    res.render('confirm-registration', { title: 'Confirm Registration' });
});

module.exports = router;