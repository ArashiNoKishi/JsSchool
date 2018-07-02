import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedView: 'itemView'
    };
  }
  render(){
    return (
      <div className="mainContent">
        <HeaderContent selected={this.props.shelf} selectedView={this.state.selectedView} changeView={view => this.setState({selectedView: view})}/>
        <BookList filterString={this.props.filterString} selected={this.props.shelf} selectedView={this.state.selectedView}/>
      </div>
    );
  }
}

class HeaderContent extends React.Component {
  render() {
    let viewOptions = [
      {view: 'itemView', icon: 'large'},
      {view: 'listView', icon: 'list'}
    ];
    return (
      <div className="headerContent">
        <div className="currentLibrary">
          <h3 id="currentLibrary">{this.props.selected}</h3>
        </div>
        <div className="sorter">
          <span className="active" id="releaseDate">Release Date</span> | <span id="popularity">Popularity</span>
        </div>
        <div className="displayOption">
          {viewOptions.map(option=>
            <ViewOption option={option} selected={this.props.selectedView} selectView={option => this.props.changeView(option)}/>)}
        </div>
      </div>
    );
  }
}

class ViewOption extends React.Component {
  render(){
    let viewClass = '';

    if (this.props.option.view == this.props.selected) {
      viewClass = " active";
    }

    let viewId = this.props.option.view;
    let iconClass = "fas fa-th-" + this.props.option.icon;
    return (
      <span className={viewClass} id={viewId} onClick={event => this.props.selectView(this.props.option.view)}><i className={iconClass}></i></span>
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
      lendBook: {}
    };
  }

  componentDidMount(){
    this.callApi()
      .then(/*res => this.setState({bookList: res.books})*/)
      .catch(err => console.error(err));
  }

  async callApi() {
    let query = this.props.selected=='All'?'':'&location=' + this.props.selected;
    const response = await fetch('/api/books'+query);
    const books = await response.json();

    this.setState({bookList: books});

    if (response.status !== 200) throw Error(message);
  }

  handleBookDetailer(book) {
    this.setState({bookDetailed: book, shouldDetail: true, shouldLend: false});
  }

  handleBookLending(book) {
    this.setState({lendBook: book, shouldLend: true});
  }

  render() {
    this.callApi();
    let listClass = 'bookList ';
    listClass += this.props.selectedView;
    return (
      <div className="content" id="content">
        <ul className={listClass} id="bookList">
          {this.state.bookList &&
           this.state.bookList.books.filter(book =>
           book.title.toLowerCase().includes(this.props.filterString.toLowerCase()))
           .map(book => <li className="itemVw"><Book book={book} viewOption={this.props.selectedView} detailBook={book => this.handleBookDetailer(book)}/></li>)}
        </ul>
        {this.state.shouldDetail &&
          <BookDetailer book={this.state.bookDetailed} closeDetailer={() => this.setState({shouldDetail: false, shouldLend: false})} lendBook={book => this.handleBookLending(book)}/>}
        {this.state.shouldLend &&
          <BookLend book={this.state.lendBook} closeLender={() => this.setState({shouldLend: false})}/>}
      </div>
    );
  }
}

class BookDetailer extends React.Component {
  render() {
    return(
      <div className="bookInfo">
        <h5 id="bookTitle">{this.props.book.title}</h5><br/>
        <span>Book by </span>
        <span id="bookAuthor">
        {this.props.book.authors ? this.props.book.authors : 'Unknown author'}</span><br/>
        <span><span>
        {this.props.book.pages ? this.props.book.pages : 'Unknown'}</span> pages
        </span><br/>
        <h5>SUMMARY</h5><br/>
        <p>
        {this.props.book.summary ? this.props.book.summary : 'No summary available'}
        </p><br/>
        <h5>LOCATION:</h5>
        <span>{this.props.book.location}</span><br/>
        <h5>RATING</h5>
        <span className="bookRating">{printStarRating(this.props.book.rating)}</span>
        <span className="button" onClick={event => this.props.closeDetailer()}><i class="fas fa-times"></i></span>
        {!this.props.book.isLent &&
          <span className="lendButton" onClick={event => this.props.lendBook(this.props.book)}>Lend book</span>}
      </div>
    );
  }
}

class BookLend extends React.Component {

  async lendBook(book) {
    let response = await fetch('/api/lend/'+book.isbn);
  }

  render() {
    return (
      <div className="lendBook">
        <DayPicker/>
        <span className="lendButton" onClick={event => this.lendBook(this.props.book)}>Lend Book</span>
        <span className="cancelButton" onClick={event => this.props.closeLender()}>Cancel</span>
      </div>
    ); 
  }
}

class Book extends React.Component{
  render() {
    let viewClass = 'detailer ';
    viewClass += this.props.viewOption;
    return (
      <div className={viewClass} onClick={event => this.props.detailBook(this.props.book)}>
        {this.props.book.isLent &&
        <span className="lent"><i class="fas fa-flag"></i></span>}
        <img src={this.props.book.image} className="bookImage"/>
        <span className="bookTitle">{this.props.book.title}</span><br/>
        <span className="bookAuthorLine">Book by </span>
        <span className="bookAuthor">
        {this.props.book.authors ? this.props.book.authors : 'Unknown author'}</span><br/>
        <span className="bookPagesLine"> <span className="bookPages">
        {this.props.book.pages ? this.props.book.pages : 'Unknown'}</span> pages
        </span><br/>
        <h5 className="bookSummaryTitle">SUMMARY</h5><br/>
        <p className="bookSummary">
        {this.props.book.summary ? this.props.book.summary : 'No summary available'}
        </p><br/>
        <span className="bookLocation">Location: {this.props.book.location}</span><br/>
        <span className="bookRating">{printStarRating(this.props.book.rating)}</span>
      </div>
    );
  }
}

class StarRating extends React.Component {
  render() {
    return (
      <i className={this.props.fill?"fas fa-star":"far fa-star"}></i>
    );
  }
}

function printStarRating(rt) {
  let star = [1,2,3,4,5];
    return (
      <span>
        {star.map((st) =>
          rt>=st?<StarRating fill={true}/>:<StarRating fill={false}/>
        )}
      </span>
    );
}

export default MainContent;
