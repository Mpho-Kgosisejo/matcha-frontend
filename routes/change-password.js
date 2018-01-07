var express = require('express');
var router = express.Router();
var request = require('request');
var redirect = require('../functions/redirect');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

/* GET users listing. */
router.get('/change-password/:token/:email', function(req, res, next) {
    url = localStorage.getItem('api_url') + '/verify-token-forgotpassword';
    formdata = {token: req.params['token'], email: req.params['email']};

    request.post(url, {form: formdata}, function(err, resp, body){

        try{
            body = JSON.parse(body);

            if (body.hasOwnProperty('response')){
                if (body.response.state === 'true'){
                    res.render('change-password', {title: ' - Change Password', url_args: {token: req.params['token'], email: req.params['email']}});
                }
                else{
                    localStorage.setItem('flash_message', body.response.message);
                    res.redirect('/');
                }
            }else{
                res.redirect('/');
            }    
        }catch(e){
            res.redirect('/');
        }
    });
});

module.exports = router;