let fs = require('fs');
let mongodb = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/bookshelf';

mongodb.connect(url, (err, db) => {
  let bookshelfdb = db.db('bookshelf');

  fs.readFile('./data/library.json', 'utf8', function(err, data) {
      if (err) throw err;
      for (book of JSON.parse(data).list) {
        bookshelfdb.collection('bookData').insert(book, function(err, doc) {
            console.log('added book');
        if (err) throw err;
      });
    };
  });

  fs.readFile('./data/users.json', 'utf8', function(err, data) {
      if (err) throw err;
      for (user of JSON.parse(data).list) {
        bookshelfdb.collection('userData').insert(user, function(err, doc) {
            console.log('added user');
        if (err) throw err;
      });
    };
  });
});
