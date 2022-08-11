const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3001;
const postRoutes = require('./routes/post-routes');
const cors = require('cors');
require('dotenv').config({path:'./.env'})

mongoose.connect(process.env.MONGODB_URI, {
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