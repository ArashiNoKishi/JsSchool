let fs = require('fs');
let mongodb = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/bookshelf';
let fetch = require('node-fetch');

mongodb.connect(url, (err, db) => {
  let bookshelfdb = db.db('bookshelf');

  fs.readFile('./server/data/library.json', 'utf8', function(err, data) {
    if (err) throw err;
    let library = JSON.parse(data).list;
    library.map((book) => {
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
          authors: data.items[0].volumeInfo.authors?data.items[0].volumeInfo.authors:[],
          image: data.items[0].volumeInfo.imageLinks.thumbnail,
          summary: data.items[0].volumeInfo.description,
          pages: data.items[0].volumeInfo.pageCount,
          isbn: localIsbn,
          year: data.items[0].volumeInfo.publishedDate,
          isLent: library.find((bk) => bk.isbn == localIsbn).isLent,
          rating: library.find((bk) => bk.isbn == localIsbn).rating,
          location: library.find((bk) => bk.isbn == localIsbn).location
        };

        bookshelfdb.collection('bookData').insert(bookInfo, function(err, doc) {
          console.log('added book '+bookInfo.isbn);
          if (err) throw err;
        });
      }).catch((error) => {
        console.error(error);
      });
    });
  });

  fs.readFile('./server/data/users.json', 'utf8', (err, data) => {
    if (err) throw err;

    for (user of JSON.parse(data).list) {
      bookshelfdb.collection('userData').insert(user, (err, doc) => {
        console.log('added user');

        if (err) throw err;
      });
    };
  });
});
