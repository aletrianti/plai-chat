// CREATE A SCHEMA FOR A PROFILE

// Modules
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export this model as a module
module.exports = Profile = mongoose.model('profile', ProfileSchema);