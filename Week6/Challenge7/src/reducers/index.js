import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import filterString from './filterStringReducer.js';
import selectedShelf from './selectShelfReducer.js';
import selectedView from './selectViewReducer.js';

const allReducers = combineReducers({
  loginReducer, //App, Login, UserAvatar, BookLend, BookList
  filterString, //SearchBox, BookList, HeaderContent
  selectedShelf, //BookshelfOption, HeaderContent, BookList
  selectedView, //HeaderContent, BookList
});

export default allReducers;
