import axios from 'axios';

import ActionTypes from '../constants/ActionTypes';


export function fetchMurals(parentForumId) {
  return async (dispatch, getState) => {
    try {
      let url = window.Urls['api:v1:mural:list']();
      const murals = (await axios.get(url)).data.results;
      dispatch({ type: ActionTypes.FETCH_MURALS_SUCCESS, murals });
    } catch (err) {
      let error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.FETCH_MURALS_FAILURE, error });
    }
  }
}
