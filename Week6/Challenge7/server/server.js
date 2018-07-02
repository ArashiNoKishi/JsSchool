let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
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
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/books', (req, res) => {
  bookData.find()
    .then((books)=> {
      res.send({books: books});
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/api/books&location=:location', (req, res) => {
  bookData.find(req.params, (err, book) => {
    res.send({books: book});
  });
});

app.get('/api/lend/:isbn', (req, res) => {
  bookData.updateOne(req.params, {isLent: 'true'}, (err) =>{
    res.send({status: 'succes'});
  });
});

app.post('/login', (req, res) => {
  userData.findOne({'username': req.body.user}, (err, user) => {
    console.log(user, req.body);
    if (user.password == req.body.password) {
      console.log('logged in succesfull');
      res.redirect('/books');
    } else {
      console.log('username or password incorrect');
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001...');
});
