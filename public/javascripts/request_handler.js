//localStorage.setItem('api_url', 'http://127.0.0.1:8080/matcha-api');
var site = 'http://127.0.0.1:8080/matcha-backend';
var api = (site + '/public');

function    login_request(_url, method, formdata){
    var _http = new XMLHttpRequest();

    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            try{
                body = JSON.parse(_http.responseText);
                
                if (body.response.state == 'true'){
                    setCookie('login_session', body.data.session);
                    itemId('login_err_mssg').innerHTML = '';
                    track_user();

                    document.location.reload(true);
                }else{
                    autoScroll('#tabs-swipe-demo');
                    $('#login_err_mssg').slideUp('fast');
                    $('#login_err_mssg').html(htmlAlert('danger', body.response.message));
                    $('#login_err_mssg').slideDown('slow');                                        
                    //itemId('login_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                }
                clear_input('access_password');
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    register_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
        _http.open(method, (api + _url), true);
        _http.setRequestHeader('Accept', 'application/json');
        _http.onload = function(){
            if (_http.status == 200){
                ////console.log('ok');
            }else{
                ////console.log('error');
            }
        }
        _http.onreadystatechange = function(){
            if (_http.readyState == 4 && _http.status == 200){
                try{
                    body = JSON.parse(_http.responseText);
                    
                    if (body.response.state == 'true'){
                        //console.log('Ok');
                        $text = '<h5 class="small-font">You were successully registered.</h5>' +
                                'A <b>confirmation code</b> was sent to you via email.' +
                                '<br>' +
                                '<small>complete the confirmation at this link: <a href="/confirm-registration">Confirm Registration</a></small>'; 
                        itemId('reg_err_mssg').innerHTML = htmlAlert('success', $text);

                        itemId('reg_first_name').value = '';
                        itemId('reg_last_name').value = '';
                        itemId('reg_username').value = '';
                        itemId('reg_email').value = '';
                        itemId('reg_password').value = '';
                        itemId('dob').value = '';
                    }else{
                        itemId('reg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                    }
                    autoScroll('#tabs-swipe-demo');
                }catch(e){
                    //console.log(e);
                }
            }
        }
        _http.send(formdata);
}

function    confirm_registration(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            try{
                body = JSON.parse(_http.responseText);
                
                if (body.response.state == 'true'){
                    itemId('cnfrm_reg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);;
                    
                }else{
                    itemId('cnfrm_reg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    confirm_reg_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){
            try{
                body = JSON.parse(_http.responseText);
                
                if (body.response.state == 'true'){
                    $text = '<h5 class="small-font">Confirmation successful</h5>' +
                            'You can now <a href="/">login</a>';
                    itemId('reporter').innerHTML = htmlAlert('success', $text);

                    set_FlashMessage("Confirmation Successful. You can now log");
                    window.location = '/';
                }else{
                    itemId('reporter').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    update_profile_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
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

function    upload_file_request(_url, method, formdata, name, previewId){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    data = body.data;
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
                //console.log('Catch', e);
                autoScroll('.upload-profile-images');
                itemId('upload_profile_images_reporter').innerHTML = htmlAlert('danger', 'Could not upload '+ name +' photo at this time, try again later.');
            }
            Materialize.toast('Upload faild!', 3000);
        }
    }
    _http.send(formdata);
}

function    search_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
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

function    advanced_search_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
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
                    put_search_results(false);
                }
            }catch(e){
                //itemId('update_reporter').innerHTML = htmlAlert('danger', 'Could not update profile at this time, try again later.');
            }
        }
    }
    _http.send(formdata);
}

function    connect_to_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    response_mssg = body.response.message;
                    
                    if (response_mssg === 'connected'){
                        //Materialize.toast('Connection sent', 4000);
                        //itemId('users_relationship').innerHTML = '<b>Cancel connection</b>';
                        set_FlashMessage('Connection sent');
                    }else{
                        //Materialize.toast('Unconnected to user', 4000);
                        //itemId('users_relationship').innerHTML = 'Connect';
                        set_FlashMessage('Unconnected to user');
                    }
                    document.location.reload(true);
                    return ;
                }else{
                    Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    get_chat_request(_url, method, formdata, divId, user_id){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    mssgs = body.data;

                    $(divId).html('');
                    mssgs.forEach(function(element) {
                        if (element.user_id_from == user_id)
                            $(divId).append('<div class="mssg user"><p>'+ element.message +'<small class="chat-date text-mute">'+ element.date_created +'</small></p></div>');
                        else
                            $(divId).append('<div class="mssg other"><p>'+ element.message +'<small class="chat-date text-mute">'+ element.date_created +'</small></p></div>');
                    }, this);
                    /*
                    $(divId).append('<div class="mssg user"><p>Hello<small class="chat-date text-mute">2017-11-30 13:46:50</small></p></div>');
                    $(divId).append('<div class="mssg other"><p>Hello<small class="chat-date text-mute">2017-11-30 13:46:50</small></p></div>');
                    */
                    return ;
                }else{
                    $(divId).html('<div class="mssg loading"><p class="text-mute">Send the <b>first message</b></p></div>');
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    send_message_request(_url, method, formdata, inputId){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    itemId(inputId).value = '';
                    return ;
                }else{
                    
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    add_tag_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    tags = body.data;
                    itemId('tag').value = '';
                    Materialize.toast('Tag added', 3000);

                    put_tags(tags, 'tags_container');
                    return ;
                }else{
                    Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    delete_tag_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    tags = body.data;
                    Materialize.toast('Tag deleted', 3000);

                    put_tags(tags, 'tags_container');
                    /*itemId('tags_container').innerHTML = '';
                    tags.forEach(function(element) {
                        $('#tags_container').append('<div class="chip">'+ element.tag +'<i class="close material-icons" onclick="delete_tag('+ element.id +', '+ element.user_id +')">close</i></div>');
                    }, this);*/
                    return ;
                }else{
                    Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    tarck_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    
                }else{
                    Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    changepassword_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    $('#changepassword_modal').modal('close');
                    Materialize.toast(body.response.message, 4000);
                    clear_input('oldpswd');
                    clear_input('newpswd');
                }else{
                   itemId('pswdchg_err_mssg').innerHTML = htmlAlert('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    generate_token_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    $('#verify_email_token_container').slideDown('slow');
                    $('#email_container').slideUp('fast');
                    $('#btn_next').hide();
                    $('#btn_change_email').show();
                }else{
                   itemId('email_change_error').innerHTML = htmlChip('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    change_email_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    $('#change_email_modal').modal('close');
                    Materialize.toast('Email changed successfully', 4000);
                    
                    setTimeout(function(){
                        document.location.reload();
                    }, 5000);
                }else{
                   itemId('').innerHTML = htmlChip('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    generate_token_forgotpassword_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    $('#forgotpassword_inputs_container').slideDown('slow');
                    $('.forgotpassword_generate_token_container').slideUp('fast');
                    $('#forgotpassword_btn_next').hide();
                    $('#forgotpassword_btn_continue').show();
                }else{
                   itemId('verify_forgotpassword_error').innerHTML = htmlChip('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    continue_forgotpassword_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    window.location = '/change-password/' + body.data.token + '/' + body.data.email;
                }else{
                   itemId('verify_forgotpassword_error').innerHTML = htmlChip('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    change_forgotpassword_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    set_FlashMessage('Password changed successfully, you can now login');
                    window.location = '/';
                }else{
                   itemId('change_password_error').innerHTML = htmlChip('danger', body.response.message);
                }
            }catch(e){
                //console.log(e);
            }
        }
    }
    _http.send(formdata);
}

function    block_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    set_FlashMessage(body.response.message);
                    document.location.reload(true);
                }else{
                   Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
                Materialize.toast('Could not block user at this time, please try again', 4000);
            }
        }
    }
    _http.send(formdata);
}

function    unblock_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    set_FlashMessage(body.response.message);
                    document.location.reload(true);
                }else{
                   Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
                Materialize.toast('Could not unblock user at this time, please try again', 4000);
            }
        }
    }
    _http.send(formdata);
}

function    report_user_request(_url, method, formdata){
    var _http = new XMLHttpRequest();
    
    _http.open(method, (api + _url), true);
    _http.setRequestHeader('Accept', 'application/json');
    _http.onload = function(){
        if (_http.status == 200){
            ////console.log('ok');
        }else{
            ////console.log('error');
        }
    }
    _http.onreadystatechange = function(){
        if (_http.readyState == 4 && _http.status == 200){

            try{
                body = JSON.parse(_http.responseText);

                if (body.response.state == 'true'){
                    $('#report').modal('close');
                    if (body.data){
                        set_FlashMessage(body.response.message);
                        document.location.reload(true);
                    }
                    Materialize.toast(body.response.message, 4000);
                    itemId('report_mssg').value = '';
                }else{
                   Materialize.toast(body.response.message, 4000);
                }
            }catch(e){
                //console.log(e);
                Materialize.toast('Could not report user at this time, please try again', 4000);
            }
        }
    }
    _http.send(formdata);
}