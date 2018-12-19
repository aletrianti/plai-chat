// Check if the field/input is empty
const isFieldEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);


// Export this function as a module
module.exports = isFieldEmpty;