var request = require('request');

module.exports = {
    doGet
};
function doGet(url, formData){
    console.log('formdata: ', formData);

    request.get(url, {form: formData}, function(err, resp, body){
        console.log('response: ', body);
        return (JSON.parse(body));
        /*
        callback = JSON.parse(body);
        server = callback.response;
        
        if (!server)
            return (false);
        if (server.state == 'true')
            console.log('body: ',  server.data);
        else
            console.log('error/no data');
        */
    });
}