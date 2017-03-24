import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import muralsReducer from './murals';


export default combineReducers({
  form: formReducer,
  murals: muralsReducer
});
