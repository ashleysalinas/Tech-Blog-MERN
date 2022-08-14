const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');

router.get('/api/posts', (req,res) => {
    //Creates seperate field of creatorName, which pulls data from Users collection where the document id matches the author id from the Post model. Is there an easier way to do this?
    Post.aggregate([{
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

router.post('/api/users', (req,res) => {
    console.log(req.body)
    try {
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
    } catch (err) {
        console.log(err)
    }

    //add alert if account with email already exists
})



module.exports = router;