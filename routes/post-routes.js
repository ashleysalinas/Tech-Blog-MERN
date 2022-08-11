const router = require('express').Router();
const Post = require('../models/post');

router.get('/api/posts', (req,res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router;