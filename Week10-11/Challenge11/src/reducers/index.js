import {combineReducers} from 'redux';
import filterString from './filterStringReducer.js';
import clip from './clipReducer.js';
import clipList from './clipListReducer.js';
import video from './videoReducer.js';

const allReducers = combineReducers({
  filterString,
  clip,
  clipList,
  video
});

export default allReducers;