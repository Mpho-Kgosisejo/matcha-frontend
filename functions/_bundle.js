var build_routes = require('./build_routes');
var user_login = require('./user_login');
var server_request = require('./server_request');
var object = require('./object');

var request = server_request.ft_request;

module.exports = {
    ft_redirect: user_login.ft_redirect,
    ft_islogged: user_login.ft_islogged,
    ft_login: user_login.ft_login,
    build_routes,
    request,
    isEmpty: object.isEmpty,
    isObject: object.isObject
};