var express = require('express');
var router = express.Router();
var redirect = require('../../../functions/redirect');

/* GET users listing. */
router.get('/messages', function(req, res, next) {
    redirect.redirect(req, res, next, 'home/message/message', 'Messages');
    //res.render('home/message/message', {title: 'Messages'});
});

module.exports = router;