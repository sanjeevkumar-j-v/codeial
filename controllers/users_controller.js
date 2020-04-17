const User = require('../models/user');

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
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up'); return;}

        if(!user) {
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user in signing up'); return;}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

// sign in  and craete a session for user
module.exports.createSession = function(req, res){
    // todo later
}

