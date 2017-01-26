import axios from 'axios';

import ActionTypes from '../constants/ActionTypes';


export function fetchMurals() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.MURALS_FETCH_REQUEST, murals });
      let url = window.Urls['api:v1:mural:list']();
      const murals = (await axios.get(url)).data;
      dispatch({ type: ActionTypes.MURALS_FETCH_SUCCESS, murals });
    } catch (err) {
      let error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.MURALS_FETCH_FAILURE, error });
    }
  }
}
