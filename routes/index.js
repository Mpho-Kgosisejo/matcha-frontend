var express = require('express');
var _bundles = require('../functions/_bundle');
var request = require('request');
var router = express.Router();
var redirect = require('../functions/redirect');
var empty = require('is-empty');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  redirect.redirect(req, res, next, 'home/home', 'Home');
});

router.get('/logout', function(req, res, next) {
  _cookies = JSON.stringify(req.cookies);
  _cookies = JSON.parse(_cookies);

  if (!empty(_cookies) && _cookies.hasOwnProperty('login_session')){
    formdata = data = {session: _cookies.login_session, isSession: 1};
    
    request.get(localStorage.getItem('api_url') + '/logut', {form: formdata}, function(err, resp, body){
      res.redirect('/');
    });
  }else
    res.redirect('/');
});

module.exports = router;