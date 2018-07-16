import React from 'react';
import styled from 'styled-components';

import Book from './Book.jsx';
import BookLend from './BookLend.jsx';

const BookInfo = styled.div`
  
    color: white;
    width: 19.8%;
    background: rgba(0,0,0,0.8);
    font-size: 9.8px;
    font-family: "PlutoSansCondLight", sans-serif;
    border-radius: 6px;
    padding: 26px;
    position: fixed;
    top: 134px;
    left: 610px;
    z-index: 1;

    > div {
      position: relative;

      > .bookAuthorLine,
        .bookPagesLine {
        display: inline;
      }

      > .bookTitle {
        font-family: "PlutoSansCondBold", sans-serif;
        font-weight: bold;
        color: #6ec1e4;
        text-transform: uppercase;
        font-size: 16px;
      }

      > .bookAuthor {
        color: #979797;
        display: inline;
      }

      > .bookImage,
        .lent {
        display: none;
      }

      > h5{
        color: #979797;
        font-size: 10px;
        font-family: "PlutoSansCondBold", sans-serif;
        margin-bottom: 3px;
        margin-top: 5px;
        padding-left: 1px;
        display: inline;
      }

      > .bookSummary {
        margin-top: 5px;
        font-size: 9.8px;
        max-height: 120px;
        overflow: auto;
        display: inherit;
        text-align: justify;
      }

      > .bookRating {
        font-family: "PlutoSansCondBold", sans-serif;
        font-weight: bold;
        color: #6ec1e4;
        text-transform: uppercase;
        font-size: 10px;
      }

      > .bookYear {
        position: absolute;
        top: 16px;
        right: 0;
      }

      > div {
        .bookLent {
          bottom: -16px;
          right: 73px;
          position: absolute;
          text-align: right;
        }
      }
    }

    > .closeButton {
      position: absolute;
      right: 7px;
      top: 7px;
      border: 1px solid #7fccea;
      border-radius: 50%;
      padding: 2px 5px;
      font-family: inherit;
      color: #7fccea;
      background: rgba(0,0,0,0.8);
      cursor: pointer;

      &:hover {
        background: #191919;
      }

      &:active {
        background: #323232;
      }
    }

    > .lendButton {
      position: absolute;
      border: 1px solid #7fccea;
      border-radius: 5px;
      padding: 2px 5px;
      font-family: inherit;
      color: #7fccea;
      background: rgba(0,0,0,0.8);
      cursor: pointer;
      right: 7px;
      bottom: 7px;

      &:hover {
        background: #191919;
      }

      &:active {
        background: #323232;
      }
    }

    > .unavailableButton {
      position: absolute;
      border: 1px solid #7fccea;
      border-radius: 5px;
      padding: 2px 5px;
      font-family: inherit;
      color: #7fccea;
      background: rgba(0,0,0,0.8);
      right: 7px;
      bottom: 7px;
    }
  
    @media (max-width: 900px) {
      left: 20%;
      width: 60%;
    }
`;

class BookDetailer extends React.Component {
  render() {
    return (
      <BookInfo>
        <Book book={this.props.book}/>
        <span className="closeButton"
          onClick={event => this.props.closeDetailer()}><i class="fas fa-times"></i></span>
        {!this.props.book.isLent?
          this.props.book.location != 'Digital' ?
            !this.props.shouldLend?
              <span className="lendButton"
                onClick={(event) => this.props.lendBook(this.props.book)}>Lend book</span>
              :
              <BookLend book={this.props.book}
                closeLender={() => this.props.closeLender()}/>
          :
          <span className="lendButton"
            onClick={(event) => this.props.downloadBook(this.props.book)}>Download book</span>
        :
        <span className="unavailableButton">Book Unavailable</span>}
      </BookInfo>
    );
  }
}

export default BookDetailer;
