const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    const { firstName, lastName, email, password } = req.body;
    try {
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        res.json(newUser)
    } catch (err) {
        if (err.code == 11000) {
            res.json('email exists')
        }
        console.log(err)
    }

    //add alert if account with email already exists
})

//find one user for sign in
router.get('/api/users', async (req,res) => {
    const {email, password } = req.query;
    try {
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.json('no')
        } //no email found

        if (!bcrypt.compareSync(password, user.password)) {
            return res.json('no')
        } //no password

         const sessUser = {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        res.json(sessUser)
        req.session.save(() => {
            req.session.user_id = sessUser._id,
            req.session.logged_in = true
        }).then((err) => {if (err) throw err})
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
        }
   ).then(posts => {
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

//get comments for post
router.post('/api/comment', async (req,res) => {
    const { id } = req.body;
    const postId = mongoose.Types.ObjectId(id);
     try {
        await Post.aggregate([
            {
            $match: {
                _id: postId
            }
        },
        { $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "creatorName"
        }},
        {
            $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "postComments",
             pipeline: [{$lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "commenterUsername"
            }}] 
        }}
    ]).then(post => res.json(post))
    } catch (err) {
        console.log(err)
    }
    }
)

//add comment
router.post('/api/newcomment', async (req, res) => {
    const { id, userID, value } = req.body;
    const postID = mongoose.Types.ObjectId(id);
    const newUserID = mongoose.Types.ObjectId(userID);

    try {
        await Comment.create({
            post: postID,
            user: newUserID,
            commentText: value
        })
    } catch (err) {
        console.log(err)
    }
})

//delete comment
router.delete('/api/deletecomment', async (req,res) => {
    const {_id: commentID } = req.query
    const { postID: postID } = req.query

    try {
        await Comment.deleteOne({
            _id: commentID
        })

        const newComments = await Post.aggregate([
            {
            $match: {
                _id: postID
            }
        },
        { $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "creatorName"
        }},
        {
            $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "postComments",
             pipeline: [{$lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "commenterUsername"
            }}] 
        }}
    ])
    res.json(newComments)
    } catch (err) {
        console.log(err)
    }
})

router.get('/api/getuserprofile' , async (req, res) => {
    const { userID: id} = req.query;
    const userIDObject = mongoose.Types.ObjectId(id);

    await User.aggregate([
       {
        $match:{
            _id: userIDObject
        }  
       },
       {
        $lookup: {
            from: 'posts',
            localField: "_id",
            foreignField: "author",
            as: "userPosts"
        }
       }]).then(user => res.json(user))
    })

 router.delete('/api/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) throw (err);
        res.clearCookie('session-id');
        res.send('Logged out successfully')
    })
})
module.exports = router;