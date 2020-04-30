const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
    },
    // defines object id of liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // defines type of liked object id, since it is dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;