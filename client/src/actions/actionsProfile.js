import axios from 'axios';
import { PROFILE, CLEAR_PROFILE } from './types';

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