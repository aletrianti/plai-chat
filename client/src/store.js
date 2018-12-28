// HANDLES THE STORE
// Store: an objects that brings actions and reducers together.
// It holds the application state and allows to share data between components.

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

// thunk middleware
const middleware = [thunk];

// Create store
const store = createStore(reducers, {}, applyMiddleware(...middleware));

export default store;