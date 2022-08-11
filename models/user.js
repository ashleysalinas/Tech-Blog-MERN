const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    creationDate: {
        type: Date,
        default: () => new Date()
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //Add email validation later
    },
    password: {
        type: String,
        required: true
        //hash password later https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
    },
/*    _id: new ObjectID() */
})

const User = mongoose.model('User', userSchema);
module.exports = User;