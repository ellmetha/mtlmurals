import ActionTypes from '../constants/ActionTypes';


const initialState = {
  error: null,
  list: [],
  items: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MURALS_SUCCESS:
      const list = action.murals.map(item => item.id);
      const items = {};
      action.murals.forEach(mural => { items[mural.id] = mural; });
      return { ...state, list, items };

    case ActionTypes.FETCH_MURALS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
