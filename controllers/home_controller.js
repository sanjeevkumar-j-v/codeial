const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial!</h1>')
    // console.log(req.cookies);
    // Post.find({}, function(err, post){
    //     if(err){
    //         console.log("error in fetching posts from db"); return; }
    //     // when tasks are succesfully fetched from db render them to home page
    //     return res.render('home',{
    //         title: "Home",
    //         posts: post
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        // when tasks are succesfully fetched from db render them to home page
        User.find({}, function(err, users){
            return res.render('home',{
                title: "Home",
                posts: posts,
                all_users: users
            });
        })
        
    })
}
// module.exports.viewPost = function(req, res){

//     Post.find({user: req.user._id}, function(err, post){
//         if(err){
//             console.log("error in fetching posts from db");
//             return;
//         }
//         // when tasks are succesfully fetched from db render them to home page
//         return res.render('home',{
//             title: "profile",
//             posts: post
//         })

//     })
// }

// module.exports.play = function(req, res){
//     return res.end('<h1>This is playGround for express</h1>')
// }