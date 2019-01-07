// KEYS FOR EACH ENVIRONMENT

// Check for environment
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prodKeysConfig');
} else {
    module.exports = require('./devKeysConfig');
}