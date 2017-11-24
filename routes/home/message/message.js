var express = require('express');
var router = express.Router();
var request = require('request');
var redirect = require('../../../functions/redirect');

/* GET users listing. */
router.get('/messages', function(req, res, next) {
    _cookies = JSON.stringify(req.cookies);
    _cookies = JSON.parse(_cookies);

    var formdata = {session: _cookies.login_session};

    request.get(localStorage.getItem('api_url') + '/friend-list', {form: formdata}, function(err, resp, body){
        try{
            body = JSON.parse(body);
        
            if (body.hasOwnProperty('response')){
                data = body.data;
                console.log(data);

                redirect.redirect(req, res, next, 'home/message/message', 'Messages', data, body.response.message);
            }else
                res.redirect('/');
        }catch(e){
            res.redirect('/');
        }
    });
});

module.exports = router;