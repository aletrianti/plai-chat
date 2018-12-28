import { ERRORS } from '../actions/types';

// State of every reducer at the start
const startState = {}

export default function(state = startState, action) {
    switch(action.type) {
        case ERRORS:
            return action.payload;
        default:
            return state;
    }
}