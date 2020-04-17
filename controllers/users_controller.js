module.exports.profile = function(req, res){
    // return res.end('<h1>Users profile</h1>')
    return res.render('user_profile',{
        title: 'users-profile'
    })
}

// render sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'Codeial | sign-up'
    })
}

// render sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'Codeial | sign-in'
    })
}

// get the sign up data
module.exports.create = function(req, res){
    // todo later
}

// sign in  and craete a session for user
module.exports.createSession = function(req, res){
    // todo later
}

