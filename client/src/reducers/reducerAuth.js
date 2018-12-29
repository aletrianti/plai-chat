import { CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/empty';

// State of every reducer at the start
const startState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = startState, action) {
    switch(action.type) {
        case CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}