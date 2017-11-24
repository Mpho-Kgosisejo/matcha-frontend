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
    _cookies = JSON.stringify(req.cookies);
    _cookies = JSON.parse(_cookies);

    var formdata = {username: req.params.username, session: _cookies.login_session};

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

router.get('/profile/:username/update', function(req, res, next) {
    _cookies = JSON.stringify(req.cookies);
    _cookies = JSON.parse(_cookies);

    formdata = {session: _cookies.login_session};
    if (empty(_cookies) && !_cookies.hasOwnProperty('login_session')){
        //With error mssg (cookie: pop_error)
        res.redirect('/');
        return ;
    }

    request.get(localStorage.getItem('api_url') + '/info', {form: formdata}, function(err, resp, body){
        try{
            body_loginUser = JSON.parse(body);
        
            if (body_loginUser.hasOwnProperty('response')){
                data = body_loginUser.data;

                var formdata = {username: req.params.username};
                
                    request.get(localStorage.getItem('api_url') + '/profile', {form: formdata}, function(err, resp, body){
                        try{
                            body = JSON.parse(body);
                        
                            if (body.hasOwnProperty('response')){
                                data = body.data;
                                //console.log(data);

                                if (body.data.id === body_loginUser.data.id){
                                    redirect.redirect(req, res, next, 'home/profile/update', 'Update Profile', data, body.response.message);
                                    return ;
                                }
                                else
                                    res.redirect('/');
                                return ;
                            }else
                                res.redirect('/');
                            return ;
                        }catch(e){
                            res.redirect('/');
                            return ;
                        }
                    });
                //redirect.redirect(req, res, next, 'home/profile/profile', 'Profile', data, body_loginUser.response.message);
            }else
                res.redirect('/');
            return ;
                //(cookie: pop_error)
        }catch(e){
            res.redirect('/');
        return ;
        }
    });
    //res.redirect('/');
});

module.exports = router;