import React from 'react';
import DayPicker from 'react-day-picker';
import axios from 'axios';
import 'react-day-picker/lib/style.css';

class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedView: 'itemView',
    };
  }
  render() {
    return (
      <div className="mainContent">
        <HeaderContent selected={this.props.shelf}
          selectedView={this.state.selectedView}
          changeView={(view) => this.setState({selectedView: view})}
          filterString={this.props.filterString}/>
        <BookList filterString={this.props.filterString}
          selected={this.props.shelf}
          selectedView={this.state.selectedView}
          checkSession={this.props.checkSession}/>
      </div>
    );
  }
}

class HeaderContent extends React.Component {
  render() {
    let viewOptions = [
      {view: 'itemView', icon: 'large'},
      {view: 'listView', icon: 'list'},
    ];
    return (
      <div className="headerContent">
        <div className="currentLibrary">
          <h3 id="currentLibrary">{this.props.filterString.length > 0 ?
            this.props.selected + ' - filter: \''+ this.props.filterString+'\'':
            this.props.selected}</h3>
        </div>
        <div className="sorter">
          <span className="active" id="releaseDate">Release Date</span> |
          <span id="popularity">Popularity</span>
        </div>
        <div className="displayOption">
          {viewOptions.map((option)=>
            <ViewOption option={option} selected={this.props.selectedView}
              selectView={(option) => this.props.changeView(option)}/>)}
        </div>
      </div>
    );
  }
}

class ViewOption extends React.Component {
  render() {
    let viewClass = '';

    if (this.props.option.view == this.props.selected) {
      viewClass = ' active';
    }

    let viewId = this.props.option.view;
    let iconClass = 'fas fa-th-' + this.props.option.icon;
    return (
      <span className={viewClass} id={viewId} onClick={(event) => this.props.selectView(this.props.option.view)}><i className={iconClass}></i></span>
    );
  }
}

class BookList extends React.Component {

  constructor() {
    super();
    this.state = {
      shouldDetail: false,
      book: {},
      shouldLend: false,
      lendBook: {},
      bookList: {}
    };

    this.callApi = this.callApi.bind(this);
  }

  async callApi(sel) {
    let query = sel=='All'?'':'&location=' + sel;
    await axios('/api/books'+query, {headers: {Authorization: localStorage.getItem('token')}})
      .then((res) => {
        if (res.data.status) {
          this.setState({bookList: res.data});
        } else {
          localStorage.setItem('token','');
          this.props.checkSession();
        }
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.callApi(this.props.selected);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state === nextState) {
      if (this.props.selected === nextProps.selected &&
          this.props.filterString === nextProps.filterString &&
          this.props.selectedView === nextProps.selectedView) {
        return false;
      } else {
        this.callApi(nextProps.selected);
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
    let listClass = 'bookList ';
    listClass += this.props.selectedView;
    let viewClass = 'detailer ';
    viewClass += this.props.selectedView;
    return (
      <div className="content" id="content">
        <ul className={listClass} id="bookList">
          {this.state.bookList.books &&
           this.state.bookList.books.filter((book) =>
           book.title.toLowerCase().includes(this.props.filterString.toLowerCase()) ||
            book.authors.toString().toLowerCase().includes(this.props.filterString.toLowerCase()))
           .map((book) =>
           <li className="itemVw">
             <div className={viewClass}><Book book={book} detailBook={(book) => this.handleBookDetailer(book)}/></div>
           </li>)}
        </ul>
        {this.state.shouldDetail &&
          <BookDetailer book={this.state.bookDetailed}
            closeDetailer={() => this.setState({shouldDetail: false, shouldLend: false})}
            lendBook={(book) => this.handleBookLending(book)}
            downloadBook={(book) => this.handleDownload(book)}/>}
        {this.state.shouldLend &&
          <BookLend book={this.state.lendBook} closeLender={() => this.setState({shouldLend: false})}/>}
      </div>
    );
  }
}

class BookDetailer extends React.Component {
  render() {
    return (
      <div className="bookInfo">
        <Book book={this.props.book}/>
        <span className="closeButton" onClick={event => this.props.closeDetailer()}><i class="fas fa-times"></i></span>
        {!this.props.book.isLent?
          this.props.book.location != 'Digital' ?
          <span className="lendButton" onClick={(event) => this.props.lendBook(this.props.book)}>Lend book</span>
          :
          <span className="lendButton" onClick={(event) => this.props.downloadBook(this.props.book)}>Download book</span>
        :
        <span className="lendButton">Book Unavailable</span>}
      </div>
    );
  }
}

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
      await axios.put('/api/lend/'+book.isbn, {headers: {Authorization: localStorage.getItem('token')}});
    }
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }

  render() {
    return (
      <div className="lendBook">
        <DayPicker onDayClick={this.handleDayClick}/>
        <span className="lendButton" onClick={(event) => this.lendBook(this.props.book)}>Lend Book</span>
        <span className="cancelButton" onClick={(event) => this.props.closeLender()}>Cancel</span>
      </div>
    );
  }
}

class Book extends React.Component {
  render() {
    return (
      <div onClick={(event) => this.props.detailBook(this.props.book)}>
        {this.props.book.isLent &&
        <span className="lent"><i class="fas fa-flag"></i></span>}
        <img src={this.props.book.image} className="bookImage"/>
        <span className="bookTitle">{this.props.book.title}</span><br/>
        <span className="bookAuthorLine">Book by </span>
        <span className="bookAuthor">
        {this.props.book.authors ? this.props.book.authors.toString() : 'Unknown author'}</span><br/>
        <span className="bookPagesLine"> <span className="bookPages">
        {this.props.book.pages ? this.props.book.pages : 'Unknown'}</span> pages
        </span><br/>
        <h5 className="bookSummaryTitle">SUMMARY</h5><br/>
        <p className="bookSummary">
        {this.props.book.summary ? this.props.book.summary : 'No summary available'}
        </p><br/>
        <h5 className="bookYear">{this.props.book.year}</h5>
        <h5 className="bookLocation">LOCATION: </h5><span className="bookLocation">{this.props.book.location}</span><br/>
        <h5 className="bookRatingTitle">RATING:</h5><br/>
        <span className="bookRating">{printStarRating(this.props.book.rating)}</span>
      </div>
    );
  }
}

class StarRating extends React.Component {
  render() {
    return (
      <i className={this.props.fill?'fas fa-star':'far fa-star'}></i>
    );
  }
}

function printStarRating(rt) {
  let star = [1, 2, 3, 4, 5];
    return (
      <span>
        {star.map((st) =>
          rt>=st?<StarRating fill={true}/>:<StarRating fill={false}/>
        )}
      </span>
    );
}

export default MainContent;
