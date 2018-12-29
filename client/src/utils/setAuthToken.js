import axios from 'axios';

const setAuthToken = token => {
    // If there is a token, apply it to every request
    // Otherwise, delete the Auth header
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;