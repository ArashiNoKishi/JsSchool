let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshelf');
let Schema = mongoose.Schema;

let bookDataSchema = new Schema({
  title: String,
  authors: [],
  summary: String,
  pages: Number,
  isbn: String,
  isLent: Boolean,
  rating: Number,
  location: String,
  lentTill: Date,
}, {collection: 'bookData'});

let userDataSchema = new Schema({
  username: String,
  name: String,
  password: String,
}, {collection: 'userData'});

let userData = mongoose.model('userData', userDataSchema);
let bookData = mongoose.model('bookData', bookDataSchema);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/books', verifyToken, (req, res) => {
  jwt.verify(req.token, 'topsecret', (err, authData) => {
    if (err) {
      res.send({status: false});
    } else {
      bookData.find()
        .then((books)=> {
          res.send({status: true, books: books});
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
});

app.get('/api/books&location=:location', verifyToken, (req, res) => {
  jwt.verify(req.token, 'topsecret', (err, authData) => {
    if (err) {
      res.send({status: false});
    } else {
      bookData.find(req.params, (err, book) => {
        res.send({status: true, books: book});
      });
    }
  });
});

app.post('/api/lend/:isbn', (req, res) => {
  bookData.updateOne({isbn: req.params.isbn}, {isLent: 'true', lentTill: new Date(req.body.lentTill)}, (err) =>{
    if (err) {
      console.log(err);
    } else {
      console.log('book lent');
      res.send({status: true});
    }
  });
  // jwt.verify(req.token, 'topsecret', (err, authData) => {
  //   if (err) {
  //     res.send({status: false});
  //   } else {
  //
  //   }
  // });
});

app.post('/api/login', (req, res) => {
  userData.findOne({'username': req.body.username}, (err, user) => {
    if (user && (user.password == req.body.password)) {
      jwt.sign({user: user.username, name: user.name}, 'topsecret',
      {expiresIn: '2h'}, (err, token) => {
        res.send({name: user.name, token});
      });
      console.log('logged in succesfull');
    } else {
      console.log('username or password incorrect');
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ') [1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

app.listen(3001, () => {
  console.log('Server started on port 3001...');
});
