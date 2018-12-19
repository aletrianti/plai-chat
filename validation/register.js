// Modules
const Validator = require('validator');
const isFieldEmpty = require('./empty');

// Export this function as a module
module.exports = function validateRegister(data) {
    let errors = {};

    data.name = !isFieldEmpty(data.name) ? data.name : '';
    data.email = !isFieldEmpty(data.email) ? data.email : '';
    data.password = !isFieldEmpty(data.password) ? data.password : '';
    data.password2 = !isFieldEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, { min: 2, max: 25 })) {
        errors.name = 'Name must be between 2 and 25 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, { min: 5, max: 35 })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match';
    }

    return { errors, isValid: isFieldEmpty(errors) };
}