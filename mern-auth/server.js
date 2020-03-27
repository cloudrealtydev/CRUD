const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require('./config/keys');
const passport = require("passport");
const users = require("./routes/api/users");

const app = express();

//bodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//Connect To MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
    
}).then(() => {
    console.log('Database succefully connected!')
},
    error => {
        console.log('Could not connect to database: ' + error)
    }
);

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport") (passport);

//Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server up and running on port ' + port));