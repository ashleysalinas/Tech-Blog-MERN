const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
var mongoose = require('mongoose')

//finds all posts
router.get('/api/posts', async (req,res) => {
    //Creates seperate field of creatorName, which pulls data from Users collection where the document id matches the author id from the Post model. Is there an easier way to do this?
    await Post.aggregate([{
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "creatorName"
        }
    }])
    .then(posts => res.json(posts))
    .catch(err => {
        res.status(400).json(err)
    })
})

//add user
router.post('/api/users', async (req,res) => {
    try {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(newUser => {
            res.json(newUser)
        })
    } catch (err) {
        console.log(err)
    }

    //add alert if account with email already exists
})

//find one user for sign in
router.get('/api/users', async (req,res) => {
    const {email, password } = req.query
    try {
        await User.findOne({
            email: email,
            password: password
        })
        .then(
        result => {
            res.json(result)
        })
    } catch (err) {
        res.err
    }
})
//Find posts from logged-in user
router.post('/api/myposts', async (req,res) => {
    const { _id } = req.body
    const userId = mongoose.Types.ObjectId(_id)

    try {
        await Post.find({
            author: userId,
        })
        .then(posts => {
            res.json(posts)
        })
    } catch (err) {

    }
})

//add new post
router.post('/api/newpost', async (req,res) => {
    const {newPost: {postTitle} = {}} = req.body //destructures postTitle
    const {newPost: {postText} = {}} = req.body //destructures postTitle
    const { _id } = req.body
    const userId = mongoose.Types.ObjectId(_id) //shouldn't have used this object type in the models, won't do next time
    try {
        await Post.create({
            postTitle: postTitle,
            postText: postText,
            author: userId
        })
    } catch (err) {
        console.log(err)
    }
})
//delete user post
router.delete('/api/delete', async (req,res) => {
    const postID = req.query._id
    const userID = req.query.userID
    try {
        await Post.deleteOne({_id:postID});
        const newPosts = await Post.find({author: userID})
        res.json(newPosts)
    } catch(err) {
        console.log(err)
    }
})

//update post

router.post('/api/update', async (req, res) => {
   const { _id, newTitle, newText } = req.body
   const postId = mongoose.Types.ObjectId(_id)
   try {
    await Post.findOneAndUpdate({ _id: postId } , {
        postTitle: newTitle,
        postText: newText
    })
   } catch (err) {
    console.log(err)
   }
})
module.exports = router;