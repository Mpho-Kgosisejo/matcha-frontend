localStorage.setItem('api_url', 'http://127.0.0.1:8080/matcha-api');
var site = 'http://127.0.0.1:8080/matcha-api';
var api = (site + '/public');

function    login_request(_url, method, formdata){
    var _http = new XMLHttpRequest();

    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            //console.log('ok');
        }else{
            //console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            try{
                body = JSON.parse(_http.responseText);
                
                if (body.response.state == 'true'){
                    setCookie('login_session', body.data.session);
                    itemId('login_err_mssg').innerHTML = '';

                    document.location.reload(true);
                }else{
                    autoScroll('#tabs-swipe-demo');
                    itemId('login_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);

    /*$.ajax({
        type: method,
        url: api + _url,
        crossDomain: true,
        data: formdata,
        contentType: "application/json; charset=utf-8",
        error: function() {
            console.log('err');
        },
        dataType: 'jsonp',
        success: function(data) {
            console.log('ok');
        }
     });*/
}

function    register_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
        _http.open(method, (api + _url), true);
        _http.setRequestHeader('Accept', 'application/json');
        _http.onload = function(){
            if (_http.status == 200){
                //console.log('ok');
            }else{
                //console.log('error');
            }
        }
        _http.onreadystatechange = function(){
            if (_http.readyState == 4 && _http.status == 200){
                try{
                    body = JSON.parse(_http.responseText);
                    console.log(body);
                    
                    if (body.response.state == 'true'){
                        console.log('Ok');
                        $text = '<h5 class="small-font">You were successully registered.</h5>' +
                                'A <b>confirmation code</b> was sent to you via email.' +
                                '<br>' +
                                '<small>complete the confirmation at this link: <a href="/confirm-registration">Confirm Registration</a></small>'; 

                        itemId('reg_err_mssg').innerHTML = htmlAlert('success', $text);
                    }else{
                        itemId('reg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                    }
                    autoScroll('#tabs-swipe-demo');
                }catch(e){
                    console.log(e);
                }
            }
        }
        _http.send(formdata);
}

function confirm_registration(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            //console.log('ok');
        }else{
            //console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            try{
                body = JSON.parse(_http.responseText);
                console.log(body);
                
                if (body.response.state == 'true'){
                    console.log('Ok');
                    itemId('cnfrm_reg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);;
                    
                }else{
                    itemId('cnfrm_reg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function confirm_reg_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            //console.log('ok');
        }else{
            //console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            try{
                body = JSON.parse(_http.responseText);
                console.log(body);
                
                if (body.response.state == 'true'){
                    console.log(body);
                    $text = '<h5 class="small-font">Confirmation successful</h5>' +
                            'You can now <a href="/">login</a>';
                    itemId('reporter').innerHTML = htmlAlert('success', $text);
                }else{
                    itemId('reporter').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function update_profile_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            //console.log('ok');
        }else{
            //console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){

                    Materialize.toast(body.response.message, 3000);
                    itemId('update_reporter').innerHTML = '';
                    
                    setTimeout(function(){
                        document.location.reload();
                    }, 4000);
                }else{
                    autoScroll('.update-container');
                    itemId('update_reporter').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                autoScroll('.update-container');
                itemId('update_reporter').innerHTML = htmlAlert('danger', 'Could not update profile at this time, try again later.');
            }
        }
    }
    _http.send(formdata);
}

function upload_file_request(_url, method, formdata, name, previewId){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            //console.log('ok');
        }else{
            //console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            console.log(_http.responseText);

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    data = body.data;
                    //src = site + '/' + data.url;
                    src = data.url;
                    
                    itemId(previewId).src = src;

                    Materialize.toast(name + ' was uploaded', 3000);
                    itemId('upload_profile_images_reporter').innerHTML = '';
                    if (previewId === 'profile-preview'){
                        setTimeout(function(){
                            document.location.reload();
                        }, 4000);
                    }
                    return ;
                }else{
                    autoScroll('.upload-profile-images');
                    itemId('upload_profile_images_reporter').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                console.log('Catch', e);
                autoScroll('.upload-profile-images');
                itemId('upload_profile_images_reporter').innerHTML = htmlAlert('danger', 'Could not upload '+ name +' photo at this time, try again later.');
            }
            Materialize.toast('Upload faild!', 3000);
        }
    }
    _http.send(formdata);
}

function search_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            //console.log('ok');
        }else{
            //console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    
                    put_search_results(body.data);
                }else{
                    //itemId('update_reporter').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                //itemId('update_reporter').innerHTML = htmlAlert('danger', 'Could not update profile at this time, try again later.');
            }
        }
    }
    _http.send(formdata);
}