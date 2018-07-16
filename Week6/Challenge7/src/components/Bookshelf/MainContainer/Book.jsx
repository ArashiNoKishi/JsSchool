import React from 'react';

class Book extends React.Component {
  render() {
    return (
      <div onClick={(event) => this.props.detailBook(this.props.book)?this.props.detailBook(this.props.book):""}>
        {this.props.book.isLent ?
        <div>
          <span className="lent"><i class="fas fa-flag"></i></span>
          <span className="bookLent">Available at: {this.props.book.lentTill ? this.props.book.lentTill.slice(0,10) : 'Unknown date'}</span>
        </div>
        : <span></span>}
        <img src={this.props.book.image} className="bookImage"/>
        <span className="bookTitle">{this.props.book.title}</span><br/>
        <span className="bookAuthorLine">Book by </span>
        <span className="bookAuthor">
        {this.props.book.authors.length > 0 ? this.props.book.authors.join(', ') : 'Unknown author'}</span><br/>
        <span className="bookPagesLine"> <span className="bookPages">
        {this.props.book.pages ? this.props.book.pages : 'Unknown'}</span> pages
        </span><br/>
        <h5 className="bookSummaryTitle">SUMMARY</h5><br/>
        <p className="bookSummary">
        {this.props.book.summary ? this.props.book.summary : 'No summary available'}
        </p><br/>
        <h5 className="bookYear">{this.props.book.year.slice(0,4)}</h5>
        <h5 className="bookLocation">LOCATION: </h5>
        <span className="bookLocation">{this.props.book.location}</span><br/>
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

export default Book;
