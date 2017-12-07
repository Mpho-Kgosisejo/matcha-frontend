function itemId(id){
    return (document.getElementById(id));
}

function clear_input(element_id){
    itemId(element_id).value = '';
}

function setValue(val, isNum = false){
    if (!val){
        if (isNum)
            return (0);
        else
            return ('');
    }
    return (val);
}

function setCookie(key, value){
    document.cookie = key + '=' + value;
}

function htmlAlert(type, message){
    return ('<div class="alert alert-'+ type +'">'+ message +'</div>');
}

function htmlChip(type, message){
    return ('<div class="chip chip-block chip-'+ type +'">'+ message +'<i class="close material-icons">close</i></div>');
}

function validateEmail(mail)   
{  
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true);
    }
    return (false);
}

function load_content(element, file){
    $(element).load(file);
}

function getCookie(key){
    cookies = document.cookie;

    cookies = cookies.split(';');
    cookies.forEach(function(element) {
        if (element.trim()){
            cookie_split = element.split('=');
            i = 0;
            if (!cookie_split)
                return (null);
            while (cookie_split[i]){
                search_key = cookie_split[i].trim();
                if (search_key){
                    if (search_key === key){
                        value = cookie_split[i + 1];
                        console.log('found: ' + value);
                        return ('value');
                    }
                    console.log('>> ' + cookie_split[i]);
                }
                console.log('<< ' + cookie_split[i]);
                i++;
            }
        }
    });
    return (null);
}

function autoScroll(element){
	$('html, body').animate({
		scrollTop: $(element).offset().top
	}, 1000);
}

function validate_isempty(name, element){
    if (!element){
        error = name + ' can not be empty.;';
        return (error);
    }
    return ('');
}

function validate_ifless(name, num, element){
    if (element.length < num){
        error = (name + ' should be '+ num +' Characters minimum.;');
        return (error);
    }
    return ('');
}

function validate_ifgreater(name, num, element){
    if (element.length > num){
        error = (name + ' should be '+ num +' Characters maximum.;');
        return (error);
    }
    return ('');
}

function put_errors(element_id, move_to, error){
    errors = error.split(";");
    itemId(element_id).innerHTML = '';
    errors.forEach(function(element) {
        if (element.trim()){
            if (move_to)
                autoScroll(move_to);
            itemId(element_id).innerHTML += htmlChip('danger', element);
        }
    });
}

function upload_image(e, session, code, name, preview){
    var formdata = new FormData();
    var fileReader = new FileReader();
    var file = e.target.files[0];

    fileReader.addEventListener('load', function(){
        src = fileReader.result;
        formdata.append('image', src);
        formdata.append('code', code);
        formdata.append('session', session);

        Materialize.toast(name + ' is uploading...', 3000);
        upload_file_request('/profile-images', 'POST', formdata, name, preview);
    }, false);

    fileReader.readAsDataURL(file);
}

function put_search_results(data){
    console.log(data);

    itemId('search-results').innerHTML = '<hr>';

    if (!data){
        itemId('search-results').innerHTML = '<div class="alert">No match</div>';
        return ;
    }
    data.forEach(function(element) {
        url = 'https://www.liu-usa.com/_layouts/15/images/PersonPlaceholder.200x150x32.png';
        if (element.img_url)
            url = element.img_url;
        
        itemId('search-results').innerHTML += '<div class="col s12">' +
                '<div class="card horizontal search">' +
                    '<div class="card-image-tmp search-user-card-img" style="background-image: url(\''+ url +'\');">' +
                    '</div>' +
                    '<div class="card-stacked">' +
                        '<div class="card-content">' +
                            '<div class="inner">' +
                                '<h5 class="name">'+ element.firstname + ' ' + element.lastname +' <span class="font-slim">'+ element.username +'</span></h5>' +
                                '<h5 class="font-slim visits"><span><i class="material-icons">star</i> '+ element.visits +'%</span></h5>'+
                                element.biography +
                            '</div>' +
                        '</div>' +
                        '<div class="card-action">' +
                            '<a class="float-right" href="/profile/'+ element.username +'" >View Profile</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }, this);
}

function ready_user_report(userid, username){
    if (itemId('report_username') && itemId('report_userid')){
        itemId('report_userid').value = userid;
        itemId('report_username').innerHTML = username;
    }
}

function put_tags(tags, divId){
    itemId(divId).innerHTML = '';
    if (!tags){
        itemId(divId).innerHTML = '<div class="chip chip-info chip-block" style="margin: 0;">You have no tags</div>';
        return ;
    }
    tags.forEach(function(element) {
        $('#tags_container').append('<div class="chip"><a href="#'+ element.tag +'">#'+ element.tag +'</a><i class="close material-icons" onclick="delete_tag('+ element.id +', '+ element.user_id +')">close</i></div>');
    }, this);
}

function activate_places_search(){
    var input = itemId('address_autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);

}