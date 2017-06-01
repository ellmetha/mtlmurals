import ActionTypes from '../constants/ActionTypes';


const initialState = {
  error: null,
  list: [],
  items: {},
  currentPage: 0,
  pagesCount: 0,
  count: 0,
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MURALS_FETCH_REQUEST: {
      return { ...state, fetching: true };
    }
    case ActionTypes.MURALS_FETCH_SUCCESS: {
      const list = action.murals.results.map(item => item.id);
      const items = {};
      const currentPage = parseInt(action.murals.pagination.current_page, 10);
      const pagesCount = parseInt(action.murals.pagination.num_pages, 10);
      const count = parseInt(action.murals.pagination.count, 10);
      action.murals.results.forEach((mural) => { items[mural.id] = mural; });
      return { ...state, list, items, currentPage, pagesCount, count, fetching: false };
    }
    case ActionTypes.MURALS_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
        fetching: false,
      };
    default:
      return state;
  }
};
