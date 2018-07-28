let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let path = require('path');
let jwt = require('jsonwebtoken');
let socketIo = require('socket.io');
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
  loans: [],
}, {collection: 'userData'});

let userData = mongoose.model('userData', userDataSchema);
let bookData = mongoose.model('bookData', bookDataSchema);

let app = express();
let server = http.createServer(app);
let io = socketIo(server);


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

app.get('/api/:user/loans', verifyToken, (req, res) => {
  jwt.verify(req.token, 'topsecret', (err, authData) => {
    if (err) {
      res.send({status: false});
    } else {
      userData.find({username: req.params.user},'loans -_id', (err, data) => {
        let bookCount = 0;
        let loans = [];
        data[0].loans.map(loan => {
          loans.push(bookData.findOne({isbn: loan.isbn}, (err, book) => {
            return book;
          }));
        });
        Promise.all(loans)
          .then(data => {
            res.send({status: true, books: data});
          });
      });
    }
  });
});

app.post('/api/lend/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'topsecret', (err, authData) => {
    if (err) {
      res.send({status: false});
    } else {
      bookData.updateOne({isbn: req.body.isbn}, {isLent: 'true', lentTill: new Date(req.body.lentTill)}, (err) =>{
        if (err) {
          console.log(err);
        } else {
          console.log('book lent');

        }
      });
      userData.updateOne({username: req.body.user},
        {$push:{loans:{isbn: req.body.isbn, lentTill: new Date(req.body.lentTill)}}},
        (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('book added to personal loans');
        }
      });
    }
  });
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

io.on('connection', socket => {
  console.log('connected');
  
  socket.on('message', book => {
    io.sockets.emit('message', book);
    console.log(book);
    
  });
});

server.listen(3001, () => {
  console.log('Server started on port 3001...');
});
