var cookieParser = require('cookie-parser');
//var _http = require('http');
var express = require('express');
var _bundle = require('./_bundle');
var server_request = require('./server_request');
var request = require('request');
var object = require('./object');

var app = express();
app.use(cookieParser());

module.exports = {
    ft_redirect: redirect,
    ft_islogged: islogged,
    ft_login: login
};

function redirect(req, res, data){
    var cookie = req.cookies.login_session;

    if (islogged(cookie, req, res))
        res.render('home/home', data);
    else
        res.render('index', data);
}

function islogged(cookie, req, res){
    //Check if cookie match 1 in db....!!!!
    return false;
    if (cookie == '123456')
        return (true);
    else
        res.cookie('login_session', '');
    return (false);
}

function login(input, req, res){
    //add this, if login success
    console.log('login: ', input);
    formdata = data = {login: input.login, password: input.password, isSession: 0};
    request.get('http://127.0.0.1:8080/matcha-api/public/login', {form: formdata}, function(err, resp, body){
        
        console.log(body);
        //if ()
    });
    console.log('###############');
    return ;

    if (login.respone.state = 'true'){
        res.cookie('login_session', login.data.session);
    }else
        res.cookie('login_session', '');
}

function getSession(isSession, input){
    var respones = null;
    var url = 'http://127.0.0.1:8383/my_sites/matcha/public/login';
    var data = null;

    if (!isSession){
        //Get session by login & password
        
        data = {login: input.login, password: input.password, isSession: 0};
    }else{
        //Get session by session
        
        data = {session_key: input, isSession: 1};
    }
    return (server_request.doGet(url, data));
}