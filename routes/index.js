var express = require('express');
var _bundles = require('../functions/_bundle');
var request = require('request');
var router = express.Router();
var redirect = require('../functions/redirect');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  redirect.redirect(req, res, next, 'home/home', 'Home');
  /*_cookies = req.cookies;
  
  if (_cookies.hasOwnProperty('login_session')){
    formdata = data = {session: _cookies.login_session, isSession: 1};

    request.post(localStorage.getItem('api_url') + '/login', {form: formdata}, function(err, resp, body){
      //console.log(body);

      try{
        body = JSON.parse(body);
    
        if (body.hasOwnProperty('response')){
    
          if (body.response.state == 'true'){
            console.log(body.data);

            res.render('home/home', {title: 'Home', user_data: body.data});
          }else{
            res.cookie('login_session', '');
            res.render('index', {title: 'Matcha'});
          }
        }else
          res.render('index');
      }catch(e){
        res.render('index');
      }
    });
  }else
    res.render('index');*/
});

router.get('/logout', function(req, res, next) {
  _cookies = req.cookies;

  if (_cookies.hasOwnProperty('login_session')){
    formdata = data = {session: _cookies.login_session, isSession: 1};
    
    request.get(localStorage.getItem('api_url') + '/logut', {form: formdata}, function(err, resp, body){
      //console.log(body);
    });
  }
    res.redirect('/');
});

module.exports = router;