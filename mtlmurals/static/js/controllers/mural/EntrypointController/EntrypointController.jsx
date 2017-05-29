import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MuralSearchEngineContainer from './containers/MuralSearchEngineContainer';
import configureStore from './store';


const store = configureStore();

const MuralSearchEngineApp = () => (
  <Provider store={store}>
    <MuralSearchEngineContainer />
  </Provider>
);

export default {
  init() {
    ReactDOM.render(<MuralSearchEngineApp />, document.getElementById('id_mural_search_engine'));
  },
};
