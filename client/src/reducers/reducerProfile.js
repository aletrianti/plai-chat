import { PROFILE, CLEAR_PROFILE } from '../actions/types';

// State of every reducer at the start
const startState = {
    profile: null
}

export default function(state = startState, action) {
    switch(action.type) {
        case PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state;
    }
}