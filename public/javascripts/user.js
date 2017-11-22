function login(login, password){
    var formdata = new FormData();

    formdata.append('login', login);
    formdata.append('password', password);
    formdata.append('isSession', 0);

    login_request('/login', 'POST', formdata);
}

function register(fn, ln, un, email, password){
    var formdata = new FormData();
    
    formdata.append('fname', fn);
    formdata.append('lname', ln);
    formdata.append('username', un);
    formdata.append('email', email);
    formdata.append('password', password);

    register_request('/register', 'POST', formdata);
}

function confirm_reg(code){
    var formdata = new FormData();
    
    formdata.append('token', code);

    confirm_reg_request('/confirm-registration', 'POST', formdata);
}

function update_profile(session, fn, ln, gender, dob, sexual_preference, bio){
    var formdata = new FormData();
    
    formdata.append('session', session);
    formdata.append('fname', fn);
    formdata.append('lname', ln);
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    formdata.append('sexual_preference', sexual_preference);
    formdata.append('bio', bio);

    update_profile_request('/update-profile', 'POST', formdata);
}

function search_user(value){
    var formdata = new FormData();
    
    formdata.append('search_value', value);

    search_user_request('/search', 'POST', formdata);
}

/*function userInfo(session){
    var formdata = new FormData();

    formdata.append('session', 1);
    formdata.append('isSession', 1);

    console.log('>> #' + getCookie('login_session'));

    //ret = userinfo_request();
}

userInfo();*/