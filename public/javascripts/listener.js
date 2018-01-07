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
            
            //itemId('login_err_mssg').innerHTML = '';
            $('#login_err_mssg').slideUp('fast');
            $('#login_err_mssg').html('');
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
            dob = itemId('dob').value;

            if (!fn)
                error += 'Firstname can not be empty;';
            if (!ln)
                error += 'Lastname can not be empty;';
            if (!un)
                error += 'Username can not be empty;';
            else{
                if (un.length < 6)
                    error += 'Username should be 6 Characters minimum;';
            }
            if (!dob)
                error += 'Date of birth can not be empty;';
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
                    error += 'Password should be 6 Characters minimum;';
                /*
                if (pass.length > 16)
                    error += 'Password should be 16 Characters maximum;';
                */
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
                register(fn, ln, un, mail, pass, dob);
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
            address = itemId('address_autocomplete').value;

            error += validate_isempty('Firstname', fn);
            error += validate_isempty('Lastname', ln);

            put_errors('update_reporter', '.update-container', error);
            if (!error)
                update_profile(session, fn, ln, sex, dob, sexual_preference, bio, address);
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

            if (search.length > 0)
                search_user(search);
            else
                itemId('search-results').innerHTML = '';
        };
    }

    if (itemId('btn_report_user')){
        itemId('btn_report_user').addEventListener('click', function(e){
            e.preventDefault();

            outputid = 'reporter_err_mssg';
            session = itemId('logged_user_sesssion').value;
            userid = itemId('report_userid').value;
            mssg = itemId('report_mssg').value;

            itemId(outputid).innerHTML = '';
            if (mssg.length > 0)
                report_user(session, userid, mssg, outputid);
            else
                itemId(outputid).innerHTML = htmlChip('danger', 'Report message can not be empty...');
        });
    }

    if (itemId('add_tag')){
        itemId('add_tag').addEventListener('click', function(e){
            e.preventDefault();
            tag = itemId('tag').value;

            if (tag.length > 0)
                add_tag(itemId('logged_user_id').value, tag);
        });
    }

    if (itemId('get_my_address')){
        itemId('get_my_address').addEventListener('change', function(){
            if (itemId('get_my_address').checked === true){
                //API_KEY: AIzaSyAwz4ZS3dHE-2F2G2Gsn4nEsitvJbGWRBc
                //new: AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ
                var google_apikey = 'AIzaSyAwz4ZS3dHE-2F2G2Gsn4nEsitvJbGWRBc';

                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(function(data){
                         //geolocation is allowed...!
                        coords = data.coords;

                        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ coords.latitude +','+ coords.longitude +'&key='+google_apikey, function(address){
                            if (address.status == 'OK'){
                                if (address.results){
                                    formatted_address = address.results[0].formatted_address
                                    itemId('address_autocomplete').value = formatted_address;
                                    return ;
                                }
                            }
                            Materialize.toast('Could not get location.', 4000);
                        });
                    }, function(error){
                        //geolocation is blocked or something...!
                        Materialize.toast('Location is not allowed or not supported.', 4000);
                        Materialize.toast('Allow location to use this.', 4000);
                    });
                }
            }else{
                itemId('address_autocomplete').value = '';
            }
        });
    }

    if (itemId('btn_changepassword')){
        itemId('btn_changepassword').addEventListener('click', function(e){
            e.preventDefault();

            error = '';
            session = itemId('logged_user_sesssion').value;
            pold = itemId('oldpswd').value;
            pnew = itemId('newpswd').value;
            
            error += validate_isempty('Old password', pold);
            error += validate_isempty('New password', pnew);
            if (pnew)
                error += validate_ifless('New password', 6, pnew); 

            put_errors('pswdchg_err_mssg', null, error);
            if (!error)
                changepassword(session, pold, pnew);
        });
    }

    if (itemId('advanced_search_btn') && itemId('simple_search_btn')){
        itemId('advanced_search_btn').addEventListener('click', function(e){
            e.preventDefault();

            $('#simple_search').slideUp('fast');
            $('#advanced_search').slideDown('slow');
            $('#search-results').html('');

            $('#search-user').val('');
        });

        itemId('simple_search_btn').addEventListener('click', function(e){
            e.preventDefault();

            $('#advanced_search').slideUp('fast');
            $('#simple_search').slideDown('slow');
            $('#search-results').html('');
        });
    }

    if (itemId('do_advanced_search')){
        itemId('do_advanced_search').addEventListener('click', function(e){
            e.preventDefault();

            //$('#search_user_tags').val()

            var session = setValue(itemId('logged_user_sesssion').value, false);
            var age_min = setValue(itemId('search_user_age_gap_min').value, true);
            var age_max = setValue(itemId('search_user_age_gap_max').value, true);
            var fame_min = setValue(itemId('search_user_fame_gap_min').value, true);
            var fame_max = setValue(itemId('search_user_fame_gap_max').value, true);
            var location = setValue(itemId('search_user_location').value, false);
            var order_by = setValue(itemId('order_by').value, false);
            var sort_by = setValue(itemId('sort_by').value, false);
            
            advanced_search(session, age_min, age_max, fame_min, fame_max, location, order_by, sort_by);
        });
    }

    if (itemId('btn_next')){
        itemId('btn_next').addEventListener('click', function(e){
            e.preventDefault();
            new_email = itemId('newemail').value;
            old_email = itemId('oldemail').value;
            error_container = itemId('email_change_error');

            if (new_email){
                if (validateEmail(new_email)){
                    generate_token(itemId('logged_user_sesssion').value, new_email);
                }else
                    error_container.innerHTML = htmlChip('danger', 'Email not a valid email address');
            }else
                error_container.innerHTML = htmlChip('danger', 'New email can not be empty');
        });
    }

    if (itemId('btn_change_email')){
        itemId('btn_change_email').addEventListener('click', function(e){
            e.preventDefault();
            token = itemId('verify_token').value;
            new_email = itemId('newemail').value;
            session = itemId('logged_user_sesssion').value;

            if (new_email){
                change_email(session, new_email, token);
            }else
                itemId('verify_email_token_error').innerHTML = htmlChip('danger', 'Token can not be empty');
            console.log();
        });
    }

    $(".change_email_modal_class").click(function(){
        user_email = $('#logged_user_email').val();

        $('.change_email_form').html(
            '<div class="row">' +
                '<div id="email_container">' +
                    '<div class="col s12">' +
                        '<div id="email_change_error"></div>' +
                    '</div>' +
                    '<div class="input-field col s12">' +
                        '<input id="oldemail" type="text" class="_validate" value="'+ user_email +'" disabled>' +
                        //'<label for="oldemail" >Old email</label>' +
                    '</div>' +
                    '<div class="input-field col s12">' +
                        '<input type="email" class="_validate" id="newemail">' +
                        '<label for="newemail" >New email</label>' +
                    '</div>' +
                '</div>' +
                '<div id="verify_email_token_container">' +
                    '<div class="col s12">' +
                        '<div id="verify_email_token_error">' +
                            '<div class="chip chip-info chip-block">Check your mail for the token</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="input-field col s12">' +
                        '<input id="verify_token" type="text" class="_validate">' +
                        '<label for="verify_token" >Enter token</label>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    });

    if (itemId('forgotpassword_btn_next')){
        itemId('forgotpassword_btn_next').addEventListener('click', function(e){
            email = itemId('forgotpassword_email').value;

            if (email){
                if (!validateEmail(email))
                    itemId('verify_forgotpassword_error').innerHTML =  htmlChip('danger', 'Email not a valid email address');
                else
                    generate_token_forgotpassword('', email);
            }else
                $('#verify_forgotpassword_error').html(htmlChip('danger', 'Email can not be empty'));
        });
    }
    
    $('#load_forgotpassword').click(function(){
        itemId('forgotpassword_email').value = '';
        $('#verify_forgotpassword_error').html('');
    });

    $('#forgotpassword_btn_continue').click(function(){
        token = itemId('verify_forgotpassword_token').value;
        email = itemId('forgotpassword_email').value;

        if (token){
            continue_forgotpassword(token, email);
        }else
            $('#verify_forgotpassword_error').html(htmlChip('danger', 'Token can not be empty'));
    });

    if (itemId('btn_change_password')){
        itemId('btn_change_password').addEventListener('click', function(e){
            e.preventDefault();
            
            error = '';
            token = itemId('change_password_token').value;
            email = itemId('change_password_email').value;
            new_pass = itemId('new_password').value;
            confirm_pass = itemId('confirm_password').value;

            if (!token || !email)
                error += 'Token or Email are somehow empty;';
            if (!new_pass)
                error += 'New Password can not be empty;';
            if (!confirm_pass)
                error += 'Confirm Password can not be empty;';
            if (new_pass && confirm_pass){
                if (new_pass !== confirm_pass)
                    error += 'New Password and Confirm Password do not match;';
            }
            if (new_pass)
                if (new_pass.length < 6)
                    error += 'Password should be 6 Characters minimum;';

            put_errors('change_password_error', '#change_password_error', error);
            if (!error)
                change_forgotpassword(email, token, new_pass);
            else{
                itemId('new_password').value = '';
                itemId('confirm_password').value = '';
            }
        });
    }

    /*if (itemId('')){
        itemId('').addEventListener('click', function(e){

        });
    }*/

});