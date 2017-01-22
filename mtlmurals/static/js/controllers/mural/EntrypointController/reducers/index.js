import { combineReducers } from 'redux';

import muralsReducer from './murals';


export default combineReducers({
  murals: muralsReducer
});
