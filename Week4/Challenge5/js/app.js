window.onload = function() {
  let http = new XMLHttpRequest();
  let library;
  let bookShelf = [];
  const index = ['Quito', 'Cartagena', 'Medellin', 'Digital'];

  // when json is ready, the bookshelf is ready
  http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
          library = JSON.parse(http.response);
          loadBooks();
          loadBookshelf('loaderQuito', 0);
      }
  };

  // requesting local JSON
  http.open('GET', './js/data/books.json', true);
  http.send();

  // Setting up event listeners
  for (item of document.getElementsByClassName('loader')) {
      let id = item.id;
      let ind = index.indexOf(id.slice(6));
      item.addEventListener('click', () => {
            loadBookshelf(id, ind);
      });
  }

  for (view of document.getElementsByClassName('itemView')) {
      let id = view.id;
      view.addEventListener('click', () => {
            changeView(id);
      });
  }

  /**
  *joins local json and fetched api data to populate local object with that info
  */
  function loadBooks() {
      let fullShelf = [];

      for (shelf of library.list) {
          let newShelf = [];

          for (book of shelf.bookList) {
              let data = fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&key=AIzaSyDItsLD6hyT5UpCOyNhmoxyAVpNqvSTi9M`);
              let bookInfo = {};

              let info = data.then((response) => {
                  return response.json();
              }).then((data) => {
                  let localIsbn = data.items[0].volumeInfo.industryIdentifiers
                                  .find((id) => {
                      return id.type == 'ISBN_13';
                  }).identifier;
                  bookInfo = {
                      title: data.items[0].volumeInfo.title,
                      authors: data.items[0].volumeInfo.authors,
                      image: data.items[0].volumeInfo.imageLinks.thumbnail,
                      summary: data.items[0].volumeInfo.description,
                      pages: data.items[0].volumeInfo.pageCount,
                      isbn: localIsbn,
                      isLent: library.list.find((list) => {
                          return list.bookList.find((bk) => {
                              return bk.isbn == localIsbn;
                          });
                      }).bookList.find((id) => {
                          return id.isbn == localIsbn;
                      }).isLent,
                      rating: library.list.find((list) => {
                          return list.bookList.find((bk) => {
                              return bk.isbn == localIsbn;
                          });
                      }).bookList.find((id) => {
                          return id.isbn == localIsbn;
                      }).rating,
                  };

                  return bookInfo;
              }).catch((error) => {
                  console.error(error);
              });
              newShelf.push(info);
          }
          fullShelf.push(newShelf);
      }
      bookShelf = fullShelf.slice();
  }

  /**
  *changes bookshelf
  *@param {string} id clicked list item in sidebar
  *@param {int} ind index of bookshelf
  */
  function loadBookshelf(id, ind) {
      document.getElementById('bookList').innerHTML = '';
      for (load of document.getElementsByClassName('loader')) {
          load.className = 'loader';
      }
      document.getElementById('currentLibrary').innerHTML = index[ind];
      document.getElementById(id).className += ' active';
      showBooks(bookShelf[ind]);
  }

  /**
  *@param {array} bkshlf array of books from local object previoulsy populated
  */
  function showBooks(bkshlf) {
      Promise.all(bkshlf).then((shelf) => {
          for (book of shelf) {
              let listItem = document.createElement('li');
              let bookLabel = document.createElement('div');
              listItem.className = `${listItem.className }detailer noBreak`;
              bookLabel.innerHTML = `
                <img src="${book.image}" class="bookImage">
                <span class="bookTitle">${book.title}</span><br>
                <span class="bookAuthorLine">Book by </span>
                  <span class="bookAuthor">
                  ${book.authors ? book.authors : 'Unknown author'}</span><br>
                <span class="bookPagesLine"> <span class="bookPages">
                  ${book.pages ? book.pages : 'Unknown'}</span> pages
                </span><br>
                <h5 class="bookSummaryTitle">SUMMARY</h5><br>
                <p class="bookSummary">
                  ${book.summary ? book.summary : 'No summary available'}
                </p><br>
                `;
              let rating = document.createElement('span');
              rating.className = `${rating.className }bookRating`;
              rating.innerHTML = printStarRating(book.rating);
              bookLabel.append(rating);
              listItem.append(bookLabel);
              if (book.isLent) {
                  let loaned = document.createElement('span');
                  loaned.className = `${loaned.className }lent`;
                  loaned.innerHTML = '<i class="fas fa-flag"></i>';
                  bookLabel.appendChild(loaned);
              }
              let param = book;
              listItem.addEventListener('click', () => {
                loadBook(param);
              });
              document.getElementById('bookList').append(listItem);
          }
      }).catch((error) => {
          console.log(error);
      });
  }

  /**
  *changes view of the books
  *@param {string} view type of the view
  *switch between cover view and list view
  */
  function changeView(view) {
      for (option of document.getElementsByClassName('itemView')) {
          option.className = 'itemView';
          if (option.id == view) {
              option.className = `${option.className } active`;
              if (view == 'itemView') {
                  document.getElementById('bookList').style.display = 'flex';
                  for (book of document.getElementsByClassName('detailer')) {
                    book.className = 'detailer noBreak';
                  }
              } else if (view == 'listView') {
                  document.getElementById('bookList').style.display = 'block';
                  for (book of document.getElementsByClassName('detailer')) {
                    book.className = 'detailer listView';
                  }
              }
          }
      }
  }

  /**
  *funtion to print star icons depending on teh rating
  *@param {int} rt rating from the selected book
  *@return {string} html for the font awesome stars
  */
  function printStarRating(rt) {
      let star = '';
      for (let i = 0; i < 5; i++) {
          if (rt > i) {
              star = `${star}<i class="fas fa-star"></i>`;
          } else {
              star = `${star}<i class="far fa-star"></i>`;
          }
      }
      return star;
  }

  /**
  *loads details of the selected book
  *@param {object} book book object with all properties
  */
  function loadBook(book) {
    bookPanel = document.getElementById('bookInfo');
    bookPanel.innerHTML = '';
    let bookDetail = document.createElement('div');
    bookDetail.innerHTML = `
      <span id="bookTitle">${book.title}</span><br>
      <span>Book by <span id="bookAuthor">
        ${book.authors ? book.authors : 'Unknown'}</span></span><br>
      <span> <span id="bookPages">${book.pages ? book.pages : 'Unknown'}</span>
      Pages</span>
      <h5>SUMMARY</h5>
      <p id="bookSummary">
        ${book.summary ? book.summary : 'No summary available'}</p>
      <h5>RATING</h5>
    `;
    let bookRating = document.createElement('span');
    bookRating.className = 'bookRating';
    bookRating.innerHTML = printStarRating(book.rating);
    bookDetail.append(bookRating);
    bookPanel.append(bookDetail);
    let button = document.createElement('BUTTON');
    let x = document.createElement('span');
    x.innerHTML = '<i class="fas fa-times"></i>';
    button.appendChild(x);
    button.className = 'button';
    button.addEventListener('click', () => {
      bookPanel.style.display = 'none';
    });
    bookPanel.append(button);
    bookPanel.style.display = 'block';
  }
};
