// THIS BACK-END ROUTE DEALS WITH USERS' PROFILES INFO

// Modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Validation
const validateProfile = require('../validation/profile');

// Require Profile model
const Profile = require('../models/Profile');
// Require User model
const User = require('../models/User');


// Get current user's profile
// GET request
// Private route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    
    Profile
        .findOne({ user: req.user.id })
        .populate('user', ['name'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// Get profile by user ID
// GET request
// Public route
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile
        .findOne({ user: req.params.user_id })
        .populate('user', ['name'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// Create or update user's profile
// POST request
// Private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    // Check validation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    
    // Get fields
    const fields = {};
    fields.user = req.user.id;
    if(req.body.handle) fields.handle = req.body.handle;
    if(req.body.bio) fields.bio = req.body.bio;

    Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: fields }, 
                    { new: true }
                )
                .then(profile => res.json(profile));
            } else {
                // Create
                // Check if handle exists
                Profile
                    .findOne({ handle: fields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        // Save profile
                        new Profile(fields).save().then(profile => res.json(profile));
                    })
            }
        })
});

// Delete user and profile
// DELETE request
// Private route
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
            res.json({ success: true })
        );
    });
});

// Export this route as a module
module.exports = router;