import axios from 'axios';
import { PROFILE, CLEAR_PROFILE, ERRORS, CURRENT_USER } from './types';

// Current profile
export const currentProfile = () => dispatch => {
    axios
        .get('/profile')
        .then(res => dispatch({
            type: PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: PROFILE,
            payload: {}
        }));
}

// Current profile with id
export const currentProfileWithId = () => dispatch => {
    axios
        .get('/profile')
        .then(res => dispatch({
            type: PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: PROFILE,
            payload: null
        }));
}

// Clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}

// Create profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/profile', profileData)
        .then(res => history.push('/dashboard')) 
        .catch(err => dispatch({
            type: ERRORS,
            payload: err.response.data
        }));
}

// Delete profile and account together
export const deleteAccount = () => dispatch => {
    axios
      .delete('/profile')
      .then(res => dispatch({
          type: CURRENT_USER,
          payload: {}
        }))
      .catch(err => dispatch({
          type: ERRORS,
          payload: err.response.data
        }));
}