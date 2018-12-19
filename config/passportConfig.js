const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keysConfig');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Exports this function as a module
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // Find user by the id in jwt_payload
        User.findById(jwt_payload.id)
        .then(user => {
            // If the user is found, return the user
            if(user){
                return done(null, user);
            }
            // Otherwise, do not return anything
            return done(null, false);
        })
        .catch(err => console.log(err));
    }));
};