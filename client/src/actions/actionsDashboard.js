import axios from 'axios';
import { POSTS } from './types';

// Dashboard posts
export const dashboardPosts = () => dispatch => {
    axios
        .get('/posts')
        .then(res => dispatch({
            type: POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: POSTS,
            payload: {}
        }));
} 