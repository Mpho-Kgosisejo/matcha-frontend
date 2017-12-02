var express_server = 'http://127.0.0.1:4200';

var socket = io.connect(express_server);

$(document).ready(function(){

    if (itemId('logged_user')){
        socket.emit('online', {
            username: itemId('logged_user').value
        });
    }

    //Checks which users are online...
    socket.on('online', function(data){

        $('.user-offline').hide();
        data.forEach(function(element) {
            user_online = element + '-online';

            if (itemId(user_online)){
                $('#'+user_online).show();
            }
        }, this);
        //console.log('Client side: ', data);
    });

    //
    /*
    if (itemId('mssg_container')){
        itemId('mssg_container').addEventListener('click', function(){
            socket.on('send_chat_message', function(data){

                console.log('Mssg out: ', data);
            });

            console.log('Here...');
        });
    }
    */
});

/*function start_chat(from, to){
    socket.on('send_chat_message', function(data){
        if (data.mssg_from == from)
            console.log('> Mssg out: ', data);
        else
            console.log('Not..!');
    });
}*

function send_message(from, to){
    var mssg = itemId("mssg-input-" + to).value;

    if (mssg.length > 0){
        //console.log('>> ', from, ' - ', to);
        socket.emit('send_chat_message', {
            mssg_from: from,
            mssg_to: to,
            message: mssg 
        });
    }
}*/

