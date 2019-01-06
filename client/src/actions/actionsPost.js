import axios from 'axios';
import { ERRORS, POSTS, POST, DELETE_POST } from './types';

// Add post
export const addPost = (data, history) => dispatch => {
    axios   
        .post('/posts', data)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: ERRORS,
            payload: err.response.data
        }))
}

// Get posts
export const getPosts = () => dispatch => {
    axios
        .get('/posts')
        .then(res => dispatch({
            type: POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: POSTS,
            payload: null
        }));
};
  
// Get one single post by its id
export const getPost = (id) => dispatch => {
        axios
        .get(`/posts/${id}`)
        .then(res => dispatch({
            type: POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: POST,
            payload: null
        }));
};

// Delete Post
export const deletePost = (id) => dispatch => {
    axios
        .delete(`/posts/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: ERRORS,
            payload: err.response.data
        }));
};

// Add like
export const addLike = (id) => dispatch => {
    axios
        .post(`/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: ERRORS,
            payload: err.response.data
        }));
};

// Add comment
export const addComment = (idPost, data) => dispatch => {
    axios
        .post(`/posts/comment/${idPost}`, data)
        .then(res => dispatch({
            type: POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: ERRORS,
            payload: err.response.data
        }));
};
  
// Delete comment
export const deleteComment = (idPost, idComment) => dispatch => {
    axios
        .delete(`/posts/comment/${idPost}/${idComment}`)
        .then(res => dispatch({
            type: POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: ERRORS,
            payload: err.response.data
        }));
};