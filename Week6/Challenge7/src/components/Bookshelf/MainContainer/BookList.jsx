import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';

import Book from './Book.jsx';
import BookDetailer from './BookDetailer.jsx';

const Content = styled.div`
  {
    min-height: 521px;
    align-items: center;
    position: relative;
    padding: 57.4px 25px 0;
  }
`;

const BookListUl = styled.ul`
  {
    list-style-type: none;
    margin: 0;
    padding: 0px 10.5px 0;
    justify-content: space-around;
    min-height: 0px;

    &.itemView {
      display: flex;
      flex-wrap: wrap;

      > li {
        display: inline-block;
        padding: 10px;
        position: relative;
        max-width: 150px;
        min-height: 200px;
        cursor: pointer;
        user-select: none;
        margin-bottom: 6px;
      }
    }

    &.listView {
      display: block;
      width: 97%;
      max-width: none;
      font-size: 12px;

      > li  {
        display: block;
        padding: 10px;
        position: relative;
        min-height: 200px;
        margin-bottom: 6px;
      }
    }

    > li {
      > div {
        > div {
          > img {
            width: 145px;
            height: 208px;
            margin-right: 5px;
          }

          > .bookRating {
            font-family: "PlutoSansCondBold", sans-serif;
            font-weight: bold;
            color: #6ec1e4;
            text-transform: uppercase;
            font-size: 10px;
          }
        }
      }
    }
  }
`;

const BookItem = styled.div`
  {
    &.itemView {
      > div {
        > li {
          max-width: 150px;
          min-height: 200px;
          margin: 0 10px;
        }

        > br{
          display: none;
        }

        > .bookRating {
          font-size: 11px;
          display: block;
        }

        > .bookTitle {
          font-family: "PlutoSansCondBold", sans-serif;
          font-weight: bold;
          color: #231f20;
          text-transform: uppercase;
          font-size: 9px;
          display: block;
          font-size: 11px;
          padding-top: 7px;
        }

        > .bookAuthor {
          font-size: 11px;
          display: block;
        }

        > .bookAuthorLine,
          .bookPagesLine,
          .bookSummary,
          .bookSummaryTitle,
          .bookRatingTitle,
          .bookYear,
          .bookLent,
          .bookLocation {
          display: none;
        }

        > div {
          .lent {
          position: absolute;
          background: #7fccea;
          color: white;
          padding: 5px;
          }
        }
      }
    }

    &.listView {
      > div {
        > .bookTitle {
          font-family: "PlutoSansCondBold", sans-serif;
          font-weight: bold;
          color: #7fccea;
          text-transform: uppercase;
          font-size: 14px;
        }

        > .bookAuthor {
          display: inline;
        }

        > .bookRating {
          top: 40px;
          right: 0;
          position: absolute;
          font-size: 18px;
        }

        > .bookImage {
          float: left;
          margin-left: 5px;
        }

        > .bookRating {
          float: left;
        }

        > .bookAuthorLine,
          .bookPagesLine,
          h5 {
          display: inline;
        }

        > .bookSummaryTitle, {
          display: block;
        }

        > .bookSummary {
          text-align: justify;
        }

        > .bookLocation {
          display: inline;
        }

        > div {
          .lent {
          background: #7fccea;
          color: white;
          padding: 5px;
          float: right;
          }
        }

        > .bookYear {
          position: absolute;
          top: 0;
          right: 36px;
        }

        > .bookRatingTitle,
          .bookLent {
          display: none;
        }
      }
    }
  }
`;

class BookList extends React.Component {

  constructor() {
    super();
    this.state = {
      shouldDetail: false,
      bookDetailed: {},
      shouldLend: false,
      lendBook: {},
      bookList: {}
    };

    this.callApi = this.callApi.bind(this);
  }

  async callApi(sel) {
    if (sel != 'Personal Loans') {
      let query = sel=='All'?'':'&location=' + sel;
      await axios('/api/books'+query, {headers: {Authorization: localStorage.getItem('token')}})
      .then((res) => {
        if (res.data.status) {
          this.setState({bookList: res.data});
        } else {
          localStorage.setItem('token','');
        }
      })
      .catch((err) => console.error(err));
    } else {
      await axios(`/api/${this.props.user.username}/loans`, {headers: {Authorization: localStorage.getItem('token')}})
        .then(res => {          
          if (res.data.status) {
            
            this.setState({bookList: res.data});
          } else {
            localStorage.setItem('token','');
          }
        });
    }
  }

  componentDidMount() {
    this.callApi(this.props.selectedShelf);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state === nextState) {
      if (this.props.selectedShelf === nextProps.selectedShelf &&
          this.props.filterString === nextProps.filterString &&
          this.props.selectedView === nextProps.selectedView) {
        return false;
      } else {
        this.callApi(nextProps.selectedShelf);
        return true;
      }
    } else {
      return true;
    }
  }

  handleBookDetailer(book) {
    this.setState({bookDetailed: book, shouldDetail: true, shouldLend: false});
  }

  handleBookLending(book) {
    this.setState({lendBook: book, shouldLend: true});
  }

  handleDownload(book) {
    console.log("Downloading Book . . .");
  }

  render() {
    let viewClass = '';
    viewClass += this.props.selectedView;
    return (
      <Content>
        <BookListUl className={viewClass}>
          {this.state.bookList.books &&
           this.state.bookList.books.filter((book) =>
           book.title.toLowerCase().includes(this.props.filterString.toLowerCase()) ||
            book.authors.toString().toLowerCase().includes(this.props.filterString.toLowerCase()))
           .map((book) =>
           <li>
             <BookItem className={viewClass}>
               <Book book={book} detailBook={(book) => this.handleBookDetailer(book)}/>
             </BookItem>
           </li>)}
        </BookListUl>
        {this.state.shouldDetail &&
          <BookDetailer book={this.state.bookDetailed}
            closeDetailer={() => this.setState({shouldDetail: false, shouldLend: false})}
            closeLender={() => this.setState({shouldLend: false})}
            lendBook={(book) => this.handleBookLending(book)}
            shouldLend={this.state.shouldLend}
            downloadBook={(book) => this.handleDownload(book)}/>}
      </Content>
    );
  }
}

function mapStateToProps(state) {
  
  return {
    filterString: state.filterString,
    selectedShelf: state.selectedShelf,
    selectedView: state.selectedView,
    user: state.loginReducer.user
  };
}

function matchDispatchToProps(dispatch) {
  
}

export default connect(mapStateToProps, matchDispatchToProps)(BookList);
