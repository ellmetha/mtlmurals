import axios from 'axios';
import { formValueSelector } from 'redux-form';

import ActionTypes from '../constants/ActionTypes';
import FormFilters from '../constants/FormFilters';
import history from '../history';


export default function fetchMurals({ pageNumber = 1 } = {}) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.MURALS_FETCH_REQUEST, pageNumber });
      const url = window.Urls['api:v1:mural:list']();

      // Builds a querystring for the available filters.
      const state = getState();
      const selector = formValueSelector('filter');
      let parameters = `?page=${pageNumber}`;
      for (let i = 0; i < FormFilters.length; i += 1) {
        const paramName = FormFilters[i];
        const paramValue = selector(state, paramName);
        parameters += paramValue ? `&${paramName}=${paramValue}` : '';
      }

      const murals = (await axios.get(url + parameters)).data;
      dispatch({ type: ActionTypes.MURALS_FETCH_SUCCESS, murals });

      // Pushes the querystring to the browser history.
      const location = history.location;
      history.push({ ...location, search: parameters });
    } catch (err) {
      const error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.MURALS_FETCH_FAILURE, error });
    }
  };
}
