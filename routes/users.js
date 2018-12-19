// THIS BACK-END ROUTE DEALS WITH AUTHENTICATION

// Modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keysConfig');
const passport = require('passport');

// Require Validation
const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');

// Require User model
const User = require('../models/User');

// Register users
// POST request
// Public route
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegister(req.body);
    // Check validation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    // Finds a user through the email
    User.findOne({ email: req.body.email })
        // Check if the user already exists or not through the email
        .then(user => {
            if(user) {
                // If the email already exists, display a 400 status error
                return res.status(400).json({email: 'Email already exists'});
            } else {
                // If the email does NOT exist, create a new user with the following parameters
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                // Encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // If there is an error, throw the error
                        if(err) throw err;
                        // Store the hash in the database as password
                        newUser.password = hash;
                        
                        newUser
                            .save()                             // Save user
                            .then(user => res.json(user))       // If everything is fine, get user and send back a successful response with the user
                            .catch(err => console.log(err));    // If there is an error, get the error and display it in the console
                    });
                });
            }
        })
});

// Login users
// POST request
// Public route
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    // Check validation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find a user by email
    User.findOne({email})
        .then(user => {
            // Check user
            if(!user) {
                // If the email does not exist, return an error
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            // Check password
            bcrypt
                // Check if the user's password corresponds to the password typed
                .compare(password, user.password)
                .then(isMatched => {
                    // If the two match, then assign a token to the user
                    // If not, return an error
                    if(isMatched) {
                        // Create payload (what to include in the token)
                        const payload = { id: user.id, name: user.name }

                        // Assign token
                        jwt.sign(
                            payload,                // Add payload/info
                            keys.secretOrKey,       // Add key created in config/keys.js
                            { expiresIn: 3600 },    // Say when the token will expire - 1 hour
                            (err, token) => {
                                // Create token
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        })
});

// Return current user
// GET request
// Private route
router.get('/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Return the current user's info in json format
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// Export this route as a module
module.exports = router;