const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
router.get('/api/posts', (req,res) => {
    Post.aggregate([{
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "creatorName"
        }
    }])
    .then(posts => res.json(posts))
   /*  Post.find()
    .then(posts => res.json(posts)) */
    .catch(err => {
        res.status(400).json(err)
    })
})





module.exports = router;