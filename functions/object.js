module.exports = {
    isObject: function (obj){
        return ((!!obj) && (obj.constructor === Object));
    },
    isEmpty: function isEmpty(obj){
        /*
        if (!isObject(obj))
            return (false);
        */
        if (obj == {})
            return (true);
        return (false);
    }
};