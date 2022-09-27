const mongoose = require('mongoose');
const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const apiRoutes = require('./controller/api-routes');
const cors = require('cors');
require('dotenv').config({path:'./.env'})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "mySessions"
  });

app.use(session(
    {
    secret: 'foo',
    name: 'session-id',
    store: mongoDBstore,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3,
  }}
));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3002",
    credentials: true
    }))
app.use(apiRoutes);
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})