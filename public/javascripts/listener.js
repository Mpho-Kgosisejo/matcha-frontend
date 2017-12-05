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

    /*if (itemId('')){
        itemId('').addEventListener('click', function(e){

        });
    }*/

});