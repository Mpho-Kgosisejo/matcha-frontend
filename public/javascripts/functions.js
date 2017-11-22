function itemId(id){
    return (document.getElementById(id));
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
    if (element.length > num){
        error = name + ' should be '+ num +' Characters maximum.;';
        return (error);
    }
    return ('');
}

function validate_ifgreater(name, num, element){
    if (element.length > num){
        error = name + ' should be '+ num +' Characters minimum.;';
        return (error);
    }
    return ('');
}

function put_errors(element_id, move_to, error){
    errors = error.split(";");
    itemId(element_id).innerHTML = '';
    errors.forEach(function(element) {
        if (element.trim()){
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
    itemId('search-results').innerHTML = '';

    data.forEach(function(element) {
        console.log(element);
        itemId('search-results').innerHTML += '<div class="col xl6 l12 m6 s12">' +
                '<div class="card horizontal search">' +
                    '<div class="card-image search-user-card-img" style="">' +
                    '</div>' +
                    '<div class="card-stacked">' +
                        '<div class="card-content">' +
                            '<div class="inner">' +
                                '<h5 class="name">'+ element.firstname + ' ' + element.lastname +' <span class="font-slim">'+ element.username +'</span></h5>' +
                                element.biography +
                            '</div>' +
                        '</div>' +
                        '<div class="card-action">' +
                            '<div class="material-icons">stars</div>' +
                            '<a class="dropdown-button btn" href="#" data-activates="profile-view-'+ element.id +'"><i class="material-icons">more_vert</i></a>' +
                            '<ul id="profile-view-'+ element.id +'" class="dropdown-content">' +
                                '<li><a href="#!">Connect</a></li>' +
                                '<li><a href="#!">View Profile</a></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }, this);
}