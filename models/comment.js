const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    date: {
        type: Date,
        default: () => new Data()
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'posts'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    commentText: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;