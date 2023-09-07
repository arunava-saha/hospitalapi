const express = require('express');

require('dotenv').config();
const db = require('./config/mongoose');
const port = process.env.port || 8000;
const passport = require('passport');
const passportJWT = require('./config/passport')
const app = express();

db();

//Used for Session Cookie
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


app.use('/', require('./routes/route'))

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});