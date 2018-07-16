import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux';

const BookLendDiv = styled.div`
  {
    color: #aaa;
    font-size: 9.8px;
    font-family: "PlutoSansCondLight", sans-serif;
    border-radius: 6px;
    padding: 10px 0;

    > .DayPickerInput {
      > div {
        position: relative;
        right: 229px;
        bottom: 22px;
        > div {
          background: 0;
          > div {
            background: rgba(0,0,0,0.8);
            color: #7fccea;
            border-radius: 5px;
          }
        }
      }
    }

    > .lendButton,
      .cancelButton {
      position: absolute;
      border: 1px solid #7fccea;
      border-radius: 5px;
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

    > .cancelButton {
      left: 70px;
      bottom: -17px;
    }

    > .lendButton {
      left: 5px;
      bottom: -17px;
    }
  }
`;

class BookLend extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDay: null
    };

    this.lendBook = this.lendBook.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  async lendBook(book) {
    if (this.state.selectedDay) {
      await axios.post('/api/lend/',{isbn: book.isbn, user:this.props.user.username,lentTill: this.state.selectedDay.getTime()}, {headers: {Authorization: localStorage.getItem('token')}});
    }
  }

  handleDayClick(day) {
    this.setState({
      selectedDay: day,
    });
  }

  render() {
    return (
      <BookLendDiv>
        <DayPickerInput className="calendar" onDayChange={this.handleDayClick} placeholder="Pick a day"/>
        <span className="lendButton"
          onClick={(event) => this.lendBook(this.props.book)}>Lend Book</span>
        <span className="cancelButton"
          onClick={(event) => this.props.closeLender()}>Cancel</span>
      </BookLendDiv>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.loginReducer.user
  };
}

export default connect(mapStateToProps)(BookLend);