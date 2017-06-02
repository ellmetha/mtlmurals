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
      const list = action.murals.items.map(item => item.id);
      const items = {};
      const currentPage = parseInt(action.murals.page, 10);
      const pagesCount = parseInt(action.murals.pages, 10);
      const count = parseInt(action.murals.total, 10);
      action.murals.items.forEach((mural) => { items[mural.id] = mural; });
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
