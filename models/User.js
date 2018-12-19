// CREATE A SCHEMA FOR A USER

// Modules
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export this model as a module
module.exports = User = mongoose.model('users', UserSchema);