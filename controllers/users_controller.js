module.exports.profile = function(req, res){
    // return res.end('<h1>Users profile</h1>')
    return res.render('home',{
        title: 'users-profile'
    })
}