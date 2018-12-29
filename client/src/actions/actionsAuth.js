// HANDLES ACTIONS
// Actions are payloads of information that send data from your application to your store.
// The only source of information for the store.

import axios from 'axios';
import { ERRORS, CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

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

// Login user
export const login = data => dispatch => {
    axios
        .post('/users/login', data)             // Post the received data in /users/login
        .then(res => {                          // Set token to localStorage and then to the Auth header. After that, decode the token to get user data and set the current user
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decodedData = jwt_decode(token);
            dispatch(currentUser(decodedData));
        })
        .catch(err => dispatch({                // If there are errors, dispatch and return them
            type: ERRORS, 
            payload: err.response.data 
        }));
}

// Current user
export const currentUser = decodedData => {
    return {
        type: CURRENT_USER,
        payload: decodedData
    }
}

// Log out
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');       // Remove token from localStorage
    setAuthToken(false);                       // Remove Auth header
    dispatch(currentUser({}));                 // Set current user to {}
};