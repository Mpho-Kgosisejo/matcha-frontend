var express = require('express');
var request = require('request');
var router = express.Router();
var app = express();
var redirect = require('../../../functions/redirect');
var empty = require('is-empty');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
/*router.get('/profile', function(req, res, next) {

    redirect.redirect(req, res, next, 'home/profile/profile', 'Profile');
});*/

router.get('/profile/:username', function(req, res, next) {
    var formdata = {username: req.params.username};

    request.get(localStorage.getItem('api_url') + '/profile', {form: formdata}, function(err, resp, body){
        try{
            body = JSON.parse(body);
        
            if (body.hasOwnProperty('response')){
                data = body.data;
                console.log(body);
                redirect.redirect(req, res, next, 'home/profile/profile', 'Profile', data, body.response.message);
            }else
                res.redirect('/');
        }catch(e){
            res.redirect('/');
        }
    });
});

module.exports = router;