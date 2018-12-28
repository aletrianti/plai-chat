// HANDLES ACTIONS
// Actions are payloads of information that send data from your application to your store.
// The only source of information for the store.

import axios from 'axios';
import { ERRORS } from './types';

// Register user
export const register = (data, history) => dispatch => {
    axios
        .post('/users/register', data)          // Post the received data in /users/register
        .then(res => history.push('/login'))    // If everything is fine, redirect to the login page
        .catch(err => dispatch({                // If there are errors, dispatch and return them
            type: ERRORS, 
            payload: err.response.data 
        }));
}