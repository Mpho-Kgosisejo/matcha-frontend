module.exports = {
    ft_build_routes: function(app, path = '.', routes){
        //console.log('building routes... ');
        builder(app, routes, path);
        //console.log('building routes complete');
    }
};

function builder(app, routes, path = ''){
    //Temp...
    //console.log('test');
    console.log('App ready...');
    return ;

    if (!isObject(routes))
    return ;

    for (route in routes) {
        if (isObject(routes[route])){
            builder(app, routes[route], (path + '/'+ route));
        }else{
            _path = '.' + path + '/' + routes[route];

            //var index = require('./routes/index');
            app.use('/', require(_path));
            console.log(_path + '.html');
        }
    }
}

function isObject(obj){
    return ((!!obj) && obj.constructor === Object);
}