import {combineReducers} from 'redux';
import filterString from './filterStringReducer.js';
import clip from './clipReducer.js';
import clipList from './clipListReducer.js';
import video from './videoReducer.js';
import listLength from './listLengthReducer.js';
import autoPlay from './autoPlayReducer.js';

const allReducers = combineReducers({
  filterString,
  clip,
  clipList,
  video,
  listLength,
  autoPlay
});

export default allReducers;