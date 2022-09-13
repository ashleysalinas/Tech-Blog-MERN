const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api-routes');
const cors = require('cors');
require('dotenv').config({path:'./.env'})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(apiRoutes);
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})