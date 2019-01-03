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
        .then(res => history.push('/profile')) // push to '/profile/handle'
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