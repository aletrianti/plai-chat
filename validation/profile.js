// Modules
const Validator = require('validator');
const isFieldEmpty = require('./empty');

// Export this function as a module
module.exports = function validateProfile(data) {
    let errors = {};

    data.handle = !isFieldEmpty(data.handle) ? data.handle : '';

    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    return { errors, isValid: isFieldEmpty(errors) };
}