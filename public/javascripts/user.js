var chat_life = null;

function login(login, password){
    var formdata = new FormData();

    formdata.append('login', login);
    formdata.append('password', password);
    formdata.append('isSession', 0);

    login_request('/login', 'POST', formdata);
}

function register(fn, ln, un, email, password, dob){
    var formdata = new FormData();
    
    formdata.append('fname', fn);
    formdata.append('lname', ln);
    formdata.append('username', un);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('dob', dob);

    register_request('/register', 'POST', formdata);
}

function confirm_reg(code){
    var formdata = new FormData();
    
    formdata.append('token', code);

    confirm_reg_request('/confirm-registration', 'POST', formdata);
}

function update_profile(session, fn, ln, gender, dob, sexual_preference, bio, address){
    var formdata = new FormData();
    
    formdata.append('session', session);
    formdata.append('fname', fn);
    formdata.append('lname', ln);
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    formdata.append('sexual_preference', sexual_preference);
    formdata.append('bio', bio);
    formdata.append('address', address);

    update_profile_request('/update-profile', 'POST', formdata);
}

function search_user(value){
    var formdata = new FormData();
    
    formdata.append('search_value', value);

    search_user_request('/search', 'POST', formdata);
}

function connect_to_user(session, username, isAccept){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('username', username);

    if (isAccept)
        connect_to_user_request('/accept-invite', 'POST', formdata);
    else
        connect_to_user_request('/invite', 'POST', formdata);
}

function report_user(session, userid, mssg, output_id){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('userid', userid);
    formdata.append('report_message', mssg);

    console.log('id: ', userid, ' mssg: ', mssg, ' session: ', session);
    //connect_to_user_request('/report-user', 'POST', formdata);
}

function block_user(session, user){
    var formdata = new FormData();
    
    formdata.append('session', session);
    formdata.append('userid', user);

    console.log('session: ', session, ' id: ', user);
    //connect_to_user_request('/block-user', 'POST', formdata);
}

function ready_chat(header, id, userId){

    var formdata = new FormData();
    var divId = ('#chat_with_' + id);
    
    formdata.append('other_id', id);
    formdata.append('user_id', userId);

    $(divId).html('<div class="mssg loading"><p class="text-mute">Loading...</p></div>');
    if ($('#'+header).attr('class') === 'collapsible-header'){
        chat_life = setInterval(function(){
            get_chat_request('/get-chat', 'POST', formdata, divId, userId);
        }, 2000);
    }else{
        clearInterval(chat_life);
    }    
}

function send_message(from, to){
    var formdata = new FormData();
    inputId = ('mssg_input_' + to);
    mssg = itemId(inputId).value;

    formdata.append('from', from);
    formdata.append('to', to);
    formdata.append('mssg', mssg);

    if (mssg.length > 0)
        send_message_request('/send-message', 'POST', formdata, inputId);
    else
        Materialize.toast('Input can\'t be empty', 2000);
}

function add_tag(user, tag){
    var formdata = new FormData();

    formdata.append('user', user);
    formdata.append('tag', tag);
    
    add_tag_request('/add-tag', 'POST', formdata);
}

function delete_tag(id, userid){
    var formdata = new FormData();
    
    formdata.append('id', id);
    formdata.append('userid', userid);

    delete_tag_request('/delete-tag', 'POST', formdata);
}

function track_user(){
    var formdata = new FormData();

    $.getJSON('http://freegeoip.net/json/', function(data){
        if (data){
            if (itemId('logged_user_sesssion')){
                formdata.append('session', itemId('logged_user_sesssion').value);
                formdata.append('location', JSON.stringify(data));

                tarck_user_request('/track-user', 'POST', formdata);
            }
        }
    });
}

function changepassword(session, pold, pnew){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('oldp', pold);
    formdata.append('newp', pnew);

    changepassword_request('/changepassword', 'POST', formdata);
}

function advanced_search(session, age_min, age_max, fame_min, fame_max, location, order_by, sort_by){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('age_min', age_min);
    formdata.append('age_max', age_max);
    formdata.append('fame_min', fame_min);
    formdata.append('fame_max', fame_max);
    formdata.append('location', location);
    formdata.append('order_by', order_by);
    formdata.append('sort_by', sort_by);
    
    advanced_search_request('/advanced-search', 'POST', formdata);
}

function generate_token(session, new_email){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('new_email', new_email);

    generate_token_request('/generate-user-token', 'POST', formdata);
}

function generate_token_forgotpassword(session, new_email){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('new_email', new_email);

    generate_token_forgotpassword_request('/generate-user-token', 'POST', formdata);
}

function change_email(session, new_email, token){
    var formdata = new FormData();

    formdata.append('session', session);
    formdata.append('new_email', new_email);
    formdata.append('token', token);

    forgot_password_request('/change-email', 'POST', formdata);
}

function continue_forgotpassword(token, email){
    var formdata = new FormData();

    formdata.append('email', email);
    formdata.append('token', token);

    continue_forgotpassword_request('/verify-token-forgotpassword', 'POST', formdata);
}

/*function send_mssg(username, box_id){
    input_box = 'mssg-input-' + box_id;
    session = '';

    if (itemId('session')){
        session = itemId('session').value;
    }
    if (itemId(input_box)){
        mssg = itemId(input_box).value;

        if (mssg.length > 0)
            console.log(itemId(input_box).value, '%', session);
    }
}*/