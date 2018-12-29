// HANDLES REDUCERS
// Reducers specify how the application's state changes in response to actions sent to the store. 

import { combineReducers } from 'redux';
import reducerAuth from './reducerAuth';
import reducerErrors from './reducerErrors';
import reducerProfile from './reducerProfile';
import reducerDashboard from './reducerDashboard';

export default combineReducers({
    auth: reducerAuth,
    errors: reducerErrors,
    profile: reducerProfile,
    dashboard: reducerDashboard
});