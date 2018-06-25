'use strict';

window.onload = function() {
    var http = new XMLHttpRequest();
    var library = void 0;
    var bookShelf = [];
    var index = ['Quito', 'Cartagena', 'Medellin', 'Digital'];

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

    var _loop = function _loop() {
        var id = item.id;
        var ind = index.indexOf(id.slice(6));
        item.addEventListener('click', function() {
            loadBookshelf(id, ind);
        });
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = document.getElementsByClassName('loader')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            _loop();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _loop2 = function _loop2() {
        var id = view.id;
        view.addEventListener('click', function() {
            changeView(id);
        });
    };

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = document.getElementsByClassName('itemView')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var view = _step2.value;

            _loop2();
        }

        /**
        *joins local json and fetched api data to populate local object with that info
        */
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    function loadBooks() {
        var fullShelf = [];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = library.list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var shelf = _step3.value;

                var newShelf = [];

                var _loop3 = function _loop3() {
                    var data = fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + book.isbn + '&key=AIzaSyDItsLD6hyT5UpCOyNhmoxyAVpNqvSTi9M');
                    var bookInfo = {};

                    var info = data.then(function(response) {
                        return response.json();
                    }).then(function(data) {
                        var localIsbn = data.items[0].volumeInfo.industryIdentifiers.find(function(id) {
                            return id.type == 'ISBN_13';
                        }).identifier;
                        bookInfo = {
                            title: data.items[0].volumeInfo.title,
                            authors: data.items[0].volumeInfo.authors,
                            image: data.items[0].volumeInfo.imageLinks.thumbnail,
                            summary: data.items[0].volumeInfo.description,
                            pages: data.items[0].volumeInfo.pageCount,
                            isbn: localIsbn,
                            isLent: library.list.find(function(list) {
                                return list.bookList.find(function(bk) {
                                    return bk.isbn == localIsbn;
                                });
                            }).bookList.find(function(id) {
                                return id.isbn == localIsbn;
                            }).isLent,
                            rating: library.list.find(function(list) {
                                return list.bookList.find(function(bk) {
                                    return bk.isbn == localIsbn;
                                });
                            }).bookList.find(function(id) {
                                return id.isbn == localIsbn;
                            }).rating,
                        };

                        return bookInfo;
                    }).catch(function(error) {
                        console.error(error);
                    });
                    newShelf.push(info);
                };

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = shelf.bookList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var book = _step4.value;

                        _loop3();
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                fullShelf.push(newShelf);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
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
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = document.getElementsByClassName('loader')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var load = _step5.value;

                load.className = 'loader';
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        document.getElementById('currentLibrary').innerHTML = index[ind];
        document.getElementById(id).className += ' active';
        showBooks(bookShelf[ind]);
    }

    /**
    *@param {array} bkshlf array of books from local object previoulsy populated
    */
    function showBooks(bkshlf) {
        Promise.all(bkshlf).then(function(shelf) {
            var _loop4 = function _loop4() {
                var listItem = document.createElement('li');
                var bookLabel = document.createElement('div');
                listItem.className = listItem.className + 'detailer noBreak';
                bookLabel.innerHTML = '\n                <img src="' + book.image + '" class="bookImage">\n                <span class="bookTitle">' + book.title + '</span><br>\n                <span class="bookAuthorLine">Book by </span>\n                  <span class="bookAuthor">\n                  ' + (book.authors ? book.authors : 'Unknown author') + '</span><br>\n                <span class="bookPagesLine"> <span class="bookPages">\n                  ' + (book.pages ? book.pages : 'Unknown') + '</span> pages\n                </span><br>\n                <h5 class="bookSummaryTitle">SUMMARY</h5><br>\n                <p class="bookSummary">\n                  ' + (book.summary ? book.summary : 'No summary available') + '\n                </p><br>\n                ';
                var rating = document.createElement('span');
                rating.className = rating.className + 'bookRating';
                rating.innerHTML = printStarRating(book.rating);
                bookLabel.append(rating);
                listItem.append(bookLabel);
                if (book.isLent) {
                    var loaned = document.createElement('span');
                    loaned.className = loaned.className + 'lent';
                    loaned.innerHTML = '<i class="fas fa-flag"></i>';
                    bookLabel.appendChild(loaned);
                }
                var param = book;
                listItem.addEventListener('click', function() {
                    loadBook(param);
                });
                document.getElementById('bookList').append(listItem);
            };

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = shelf[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var book = _step6.value;

                    _loop4();
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /**
    *changes view of the books
    *@param {string} view type of the view
    *switch between cover view and list view
    */
    function changeView(view) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = document.getElementsByClassName('itemView')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                option = _step7.value;

                option.className = 'itemView';
                if (option.id == view) {
                    option.className = option.className + ' active';
                    if (view == 'itemView') {
                        document.getElementById('bookList').style.display = 'flex';
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = document.getElementsByClassName('detailer')[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                book = _step8.value;

                                book.className = 'detailer noBreak';
                            }
                        } catch (err) {
                            _didIteratorError8 = true;
                            _iteratorError8 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                    _iterator8.return();
                                }
                            } finally {
                                if (_didIteratorError8) {
                                    throw _iteratorError8;
                                }
                            }
                        }
                    } else if (view == 'listView') {
                        document.getElementById('bookList').style.display = 'block';
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = document.getElementsByClassName('detailer')[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                book = _step9.value;

                                book.className = 'detailer listView';
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
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
        var star = '';
        for (var i = 0; i < 5; i++) {
            if (rt > i) {
                star = star + '<i class="fas fa-star"></i>';
            } else {
                star = star + '<i class="far fa-star"></i>';
            }
        }
        return star;
    }

    /**
    *loads details of the selected book
    *@param {object} book book object with all properties
    */
    function loadBook(book) {
        var bookPanel = document.getElementById('bookInfo');
        bookPanel.innerHTML = '';
        var bookDetail = document.createElement('div');
        bookDetail.innerHTML = '\n      <span id="bookTitle">' + book.title + '</span><br>\n      <span>Book by <span id="bookAuthor">\n        ' + (book.authors ? book.authors : 'Unknown') + '</span></span><br>\n      <span> <span id="bookPages">' + (book.pages ? book.pages : 'Unknown') + '</span>\n      Pages</span>\n      <h5>SUMMARY</h5>\n      <p id="bookSummary">\n        ' + (book.summary ? book.summary : 'No summary available') + '</p>\n      <h5>RATING</h5>\n    ';
        var bookRating = document.createElement('span');
        bookRating.className = 'bookRating';
        bookRating.innerHTML = printStarRating(book.rating);
        bookDetail.append(bookRating);
        bookPanel.append(bookDetail);
        var button = document.createElement('BUTTON');
        var x = document.createElement('span');
        x.innerHTML = '<i class="fas fa-times"></i>';
        button.appendChild(x);
        button.className = 'button';
        button.addEventListener('click', function() {
            bookPanel.style.display = 'none';
        });
        bookPanel.append(button);
        bookPanel.style.display = 'block';
    }
};
