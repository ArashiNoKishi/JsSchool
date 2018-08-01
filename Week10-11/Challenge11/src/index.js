import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/App.jsx';
import allReducers from './reducers/index.js';

const videoClipperStore = createStore(allReducers);

ReactDOM.render(
  <Provider store={videoClipperStore}>
    <App />
  </Provider>,
  document.getElementById('root'));