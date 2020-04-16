module.exports.profile = function(req, res){
    // return res.end('<h1>Users profile</h1>')
    return res.render('user_profile',{
        title: 'users-profile'
    })
}