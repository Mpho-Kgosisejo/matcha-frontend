var request = require('request');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = {
    redirect: function(req, res, next, locate, title = 'Matcha'){
        _cookies = req.cookies;
        
        if (_cookies.hasOwnProperty('login_session')){
          formdata = data = {session: _cookies.login_session, isSession: 1};
      
          request.post(localStorage.getItem('api_url') + '/login', {form: formdata}, function(err, resp, body){
            //console.log(body);
      
            try{
              body = JSON.parse(body);
          
              if (body.hasOwnProperty('response')){
          
                if (body.response.state == 'true'){
                  //console.log(body.data);
      
                  res.render(locate, {title: title, user_data: body.data});
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
          res.render('index');
    }
}