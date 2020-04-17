const mongoose = require('mongoose');

console userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    password: {
        type: String,
        required: true
    }
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;