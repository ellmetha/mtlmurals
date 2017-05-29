import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      // The Thunk middleware is registered in order to allow action creators to return functions
      // instead of action objects.
      thunk,
      // Register the redux-logger's middleware if we are not in production.
      ...((process.env.NODE_ENV !== 'production') ? [createLogger()] : []),
    ),
  );
}
