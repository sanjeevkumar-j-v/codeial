const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
   
        let newPost = await Post.findOne({ _id: post._id }).populate('user', 'name');

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: newPost
                },
                message: "Post created"
            })
        }

        req.flash('success', 'Post published')
        return res.redirect('back');    

    }catch(err){
        req.flash('error', err);
        return;
    }
      
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        
        if(post.user == req.user.id){

            // delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.user._id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }
            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');

        }else{
            req.flash('error', 'Idiot, You cannot delete this post')
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error ', err);
        return res.redirect('back');
    }

}