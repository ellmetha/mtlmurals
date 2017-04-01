import axios from 'axios';
import { formValueSelector } from 'redux-form';

import ActionTypes from '../constants/ActionTypes';


export default function fetchMurals({ pageNumber = 1 } = {}) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.MURALS_FETCH_REQUEST, pageNumber });
      const url = window.Urls['api:v1:mural:list']();

      // Builds a querystring for the available filters.
      const state = getState();
      const selector = formValueSelector('filter');
      let parameters = `?page=${pageNumber}`;
      const filterYear = selector(state, 'year');
      parameters += filterYear ? `&year=${filterYear}` : '';

      const murals = (await axios.get(url + parameters)).data;
      dispatch({ type: ActionTypes.MURALS_FETCH_SUCCESS, murals });
    } catch (err) {
      const error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.MURALS_FETCH_FAILURE, error });
    }
  };
}
