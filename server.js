// ENTRY POINT OF THE WEB APP

// Modules
const express = require("express");         // Web framework for Node.js
const app = express();
const mongoose = require("mongoose");       // A MongoDB objet modeling tool - thanks to mongoose we can interact with our MongoDB database from here
const bodyParser = require('body-parser');  // A body parsing middleware - its purpose is to extract the entire body portion of a request stream and expose it on "req.body"
const passport = require('passport');       // An authentication middleware - its purpose is to authenticate requests

// Require routes
const users = require('./routes/users');
const profile = require('./routes/profiles');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));  // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json());                         // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

// Make the "uploads" folder public
app.use('/uploads', express.static('uploads'));

// DB config
const db = require('./config/keysConfig').mongoURI;

// Connect to DB
mongoose
    .connect(db, { useNewUrlParser: true })         // Connects to the database with the key specified in config/keys.js
    .then(() => console.log('Connected to db'))     // Connects and shows "Connected to db" in the console
    .catch(err => console.log(err));                // If there is an errors, it gets displayed in the console

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passportConfig')(passport);

// Use routes
app.use('/users', users);
app.use('/profile', profile);
app.use('/posts', posts);
app.use('/posts/comment', comments);

// Server config
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));  // Listens to the port specified and displays text in the console