const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3001;
const postRoutes = require('./routes/post-routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://ashleysalinas:root@Cluster0.ja3k3.mongodb.net/TechBlogMERN?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false
}) //replace with .env variables later


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(postRoutes)
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})