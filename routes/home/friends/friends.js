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
    /*
    console.log('>> ' + localStorage.getItem('api_url'));
    redirect.redirect(req, res, next, 'home/friends/friends', 'Connection');
    */

    _cookies = JSON.stringify(req.cookies);
    _cookies = JSON.parse(_cookies);

    var formdata = {session: _cookies.login_session};

    request.get(localStorage.getItem('api_url') + '/friend-list', {form: formdata}, function(err, resp, body){
        try{
            body = JSON.parse(body);
        
            if (body.hasOwnProperty('response')){
                data = body.data;
                console.log(data);

                redirect.redirect(req, res, next, 'home/friends/friends', 'Messages', data, body.response.message);
            }else
                res.redirect('/');
        }catch(e){
            res.redirect('/');
        }
    });
});

module.exports = router;