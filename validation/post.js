// Modules
const Validator = require('validator');
const isFieldEmpty = require('./empty');

// Export this function as a module
module.exports = function validatePost(data) {
  let errors = {};

  data.text = !isFieldEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 0, max: 300 })) {
    errors.text = 'Post must be max 300 characters';
  }

  return { errors, isValid: isFieldEmpty(errors) };
};