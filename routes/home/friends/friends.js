var express = require('express');
var request = require('request');
var router = express.Router();
var redirect = require('../../../functions/redirect');
var empty = require('is-empty');
//var my_localStorage = require('../../../functions/local_storage');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/connections', function(req, res, next) {
    console.log('>> ' + localStorage.getItem('api_url'));
    redirect.redirect(req, res, next, 'home/friends/friends', 'Connection');
});

module.exports = router;