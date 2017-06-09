/* eslint import/extensions: [0, {}] */
/* eslint import/no-unresolved: [0, {}] */

import ActionTypes from 'controllers/mural/EntrypointController/constants/ActionTypes';
import reducer from 'controllers/mural/EntrypointController/reducers/murals';


describe('murals reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        count: 0, currentPage: 0, error: null, fetching: false, items: {}, list: [], pagesCount: 0,
      },
     );
  });

  test('should handle MURALS_FETCH_REQUEST', () => {
    const initalState = {
      count: 0, currentPage: 0, error: null, fetching: false, items: {}, list: [], pagesCount: 0,
    };
    expect(reducer(initalState, { type: ActionTypes.MURALS_FETCH_REQUEST })).toEqual(
      {
        count: 0, currentPage: 0, error: null, fetching: true, items: {}, list: [], pagesCount: 0,
      },
     );
  });

  test('should handle MURALS_FETCH_SUCCESS', () => {
    const initalState = {
      count: 0, currentPage: 0, error: null, fetching: false, items: {}, list: [], pagesCount: 0,
    };
    const state = {
      type: ActionTypes.MURALS_FETCH_SUCCESS,
      murals: {
        page: '1',
        pages: '1',
        total: '2',
        items: [
          { id: 1, image_url: 'im1', title: 'Foo Bar 1', year: '2016' },
          { id: 2, image_url: 'im2', title: 'Foo Bar 2', year: '2017' },
        ],
      },
    };
    expect(reducer(initalState, state)).toEqual(
      {
        count: 2,
        currentPage: 1,
        error: null,
        fetching: false,
        items: {
          1: { id: 1, image_url: 'im1', title: 'Foo Bar 1', year: '2016' },
          2: { id: 2, image_url: 'im2', title: 'Foo Bar 2', year: '2017' },
        },
        list: [1, 2],
        pagesCount: 1,
      },
     );
  });

  test('should handle MURALS_FETCH_FAILURE', () => {
    const initalState = {
      count: 0, currentPage: 0, error: null, fetching: false, items: {}, list: [], pagesCount: 0,
    };
    expect(
      reducer(initalState, { type: ActionTypes.MURALS_FETCH_FAILURE, error: 'Error!' })).toEqual(
      {
        count: 0,
        currentPage: 0,
        error: 'Error!',
        fetching: false,
        items: {},
        list: [],
        pagesCount: 0,
      },
     );
  });
});
