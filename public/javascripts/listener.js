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
});