module.exports = {
    routes: {
        index: 'index',
        users: 'users'
    }
};

/*
{
    index: 'i',
    about: 'a',
    login: 'l',
    register: 'r',
    home: {
        users: 'u'
    }
}
*/

/*
** New format!

{
    name: '*',
    path: '*',
    render: '*'
},{
    name: '*',
    path: '*',
    render: '*',
    children: {
        name: '*',
        path: '*',
        render: 'parent/*'
    }
}
*/