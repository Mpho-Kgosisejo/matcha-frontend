function get_local_storage(){
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
        return (localStorage);
    }
    return (false);
}

module.exports = get_local_storage

