const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    date: {
        type: Date,
        default: () => new Date()
    },
    userID: {
        type: Number,
        required: true,
    },
    postTitle: {
        type: String,
        required: true,
    },
    postText: {
        type: String,
        required: true,
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post