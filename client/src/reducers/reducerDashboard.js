import { POSTS } from '../actions/types';

// State of every reducer at the start
const startState = {
    dashboard: null
}

export default function(state = startState, action) {
    switch(action.type) {
        case POSTS:
            return {
                ...state,
                dashboard: action.payload
            }
        default:
            return state;
    }
}