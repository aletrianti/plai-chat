import { POSTS, POST, ADD_POST, DELETE_POST } from '../actions/types';

// State of every reducer at the start
const startState = {
    posts: [],
    post: {}
}

export default function(state = startState, action) {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case POST:
            return {
                ...state,
                post: action.payload
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}