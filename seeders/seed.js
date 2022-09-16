const mongoose = require('mongoose');
const userDB = require('../models/user');
const postDB = require('../models/post');

mongoose.connect('mongodb+srv://ashleysalinas:root@Cluster0.ja3k3.mongodb.net/TechBlogMERN?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false
})

const userSeed= [
    {
        creationDate: new Date(),
        firstName: 'Spongebob',
        lastName: 'Squarepants',
        email: 'spongebob@krustykrab.com',
        password: 'gary1234'
    },
    {
        creationDate: new Date(),
        firstName: 'Squidward',
        lastName: 'Tentacles',
        email: 'squidward@krustykrab.com',
        password: 'clarinet'
    },
]

const postSeed = [
    {
        date: new Date(),
        author: mongoose.Types.ObjectId('62f29c4429046d91e2321d6e'),
        postTitle: 'This is the first blog entry on this site!',
        postText: 'So cool!'
    },
    {
        date: new Date(),
        author: mongoose.Types.ObjectId('62f29c4429046d91e2321d6f'),
        postTitle: 'I hate this',
        postText: 'I said what I said'
    }
] 

//Why did I have to delete premade User collection??? This function automatically made a seperate collection called 'users'
userDB.collection.insertMany(userSeed)
.then(console.log('Inserted users successfully!'))
.catch((err) => {
    console.log(err)
});

postDB.collection.insertMany(postSeed)
.then(console.log('Inserted posts successfully!'))
.catch((err) => {
    console.log(err)
});