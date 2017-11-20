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