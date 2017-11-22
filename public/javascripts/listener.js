$(document).ready(function(){

    if (itemId('cnfrm_reg')){
        itemId('cnfrm_reg').addEventListener('click', function(e){
            e.preventDefault();

            code = itemId('cnfrm_ref_token').value;
            itemId('reporter').innerHTML = '';
            if (!code)
                itemId('reporter').innerHTML += htmlChip('danger', 'Code can not be empty');
            else
                confirm_reg(code);
        });
    }

    if (itemId('log_user')){
        itemId('log_user').addEventListener('click', function(e){
            e.preventDefault();
            
            itemId('login_err_mssg').innerHTML = '';
            login(itemId('access_login').value, itemId('access_password').value);
        });
    }

    if (itemId('reg_user')){
        itemId('reg_user').addEventListener('click', function(e){
            e.preventDefault();
            
            error = '';
            fn = itemId('reg_first_name').value;
            ln = itemId('reg_last_name').value;
            un = itemId('reg_username').value;
            mail = itemId('reg_email').value;
            pass = itemId('reg_password').value;

            if (!fn)
                error += 'Firstname can not be empty;';
            if (!ln)
                error += 'Lastname can not be empty;';
            if (!un)
                error += 'Username can not be empty;';
            else{
                if (un.length < 6)
                    error += 'Username should be 6 Chars. min.;';
            }
            if (!mail)
                error += 'Email can not be empty;';
            else{
                if (!validateEmail(mail))
                    error += 'Email is not valid;';
            }
            if (!pass)
                error += 'Password can not be empty;';
            else{
                if (pass.length < 6)
                    error += 'Password should be 6 Chars. min.;';
                if (pass.length > 16)
                    error += 'Password should be 16 Chars. max.;';
            }

            errors = error.split(";");
            itemId('reg_err_mssg').innerHTML = '';
            errors.forEach(function(element) {
                if (element.trim()){
                    autoScroll('#tabs-swipe-demo');
                    itemId('reg_err_mssg').innerHTML += htmlChip('danger', element);
                }
            });
            
            if (!error)
                register(fn, ln, un, mail, pass);
        });
    }

    if (itemId('update_profile')){
        itemId('update_profile').addEventListener('click', function(e){
            e.preventDefault();

            error = '';
            fn = itemId('firstname').value;
            ln = itemId('lastname').value;
            //email = itemId('email').value;
            sex = itemId('gender').value;
            dob = itemId('dob').value;
            sexual_preference = itemId('sexual_preference').value;
            bio = itemId('bio').value;
            session = itemId('session').value;

            error += validate_isempty('Firstname', fn);
            error += validate_isempty('Lastname', ln);

            put_errors('update_reporter', '.update-container', error);
            if (!error)
            update_profile(session, fn, ln, sex, dob, sexual_preference, bio);
        });
    }

    if (itemId('img1')){
        itemId('img1').onchange = function(e){
            upload_image(e, itemId('session').value, 1, 'Profile', 'profile-preview');
        };
    }

    if (itemId('img2')){
        itemId('img2').onchange = function(e){
            upload_image(e, itemId('session').value, 2, 'Photo 2', 'img2-preview');
        };
    }

    if (itemId('img3')){
        itemId('img3').onchange = function(e){
            upload_image(e, itemId('session').value, 3, 'Photo 3', 'img3-preview');
        };
    }

    if (itemId('img4')){
        itemId('img4').onchange = function(e){
            upload_image(e, itemId('session').value, 4, 'Photo 4', 'img4-preview');
        };
    }

    if (itemId('img5')){
        itemId('img5').onchange = function(e){
            upload_image(e, itemId('session').value, 5, 'Photo 5', 'img5-preview');
        };
    }

    if (itemId('search-user')){
        itemId('search-user').onkeyup = function(e){
            search = itemId('search-user').value;

            if (search.length >= 3)
                search_user(search);
        };
    }
});