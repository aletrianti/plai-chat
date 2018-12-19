// Modules
const Validator = require('validator');
const isFieldEmpty = require('./empty');

// Export this function as a module
module.exports = function validateLogin(data) {
    let errors = {};

    data.email = !isFieldEmpty(data.email) ? data.email : '';
    data.password = !isFieldEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return { errors, isValid: isFieldEmpty(errors) };
}