import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/App.jsx';
import allReducers from './reducers/index.js';

const bookshelfStore = createStore(allReducers);

ReactDOM.render(
  <Provider store={bookshelfStore}>
    <App />
  </Provider>,
  document.getElementById('root'));
