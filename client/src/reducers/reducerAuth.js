// State of every reducer at the start
const startState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = startState, action) {
    switch(action.type) {
        default:
            return state;
    }
}