const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req, res){
    // return res.end('<h1>Users profile</h1>')
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: 'users-profile',
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){


    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){ console.log('***Multer Error',err)};
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            console.log("Error: ",err);
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        return res.status(401).send("Unauthorized");
    }

}

// render sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Codeial | sign-up'
    })
}

// render sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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

// sign in  and create a session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');

    return res.redirect('/');
}