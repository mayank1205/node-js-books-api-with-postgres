const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const port = 3000;

// Where we will keep books
let books = [  {
  "id": 1,
  "author": "Chinua Achebe",
  "country": "Nigeria",
  "imageLink": "images/things-fall-apart.jpg",
  "language": "English",
  "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
  "pages": 209,
  "title": "Things Fall Apart",
  "year": 1958
},
{
  "id": 2,
  "author": "Hans Christian Andersen",
  "country": "Denmark",
  "imageLink": "images/fairy-tales.jpg",
  "language": "Danish",
  "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
  "pages": 784,
  "title": "Fairy tales",
  "year": 1836
},
{
  "id": 3,
  "author": "Dante Alighieri",
  "country": "Italy",
  "imageLink": "images/the-divine-comedy.jpg",
  "language": "Italian",
  "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
  "pages": 928,
  "title": "The Divine Comedy",
  "year": 1315
}];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post('/book', (req, res) => {
  const book = req.body;

  // Output the book to the console for debugging
  console.log(book);
  books.push(book);

  res.send('Book is added to the database');
});

app.get(`/books/:id`, (req, res) => {
  console.log('this is id ', req.params.id)
  let book = _.find(books, (b) => b.id = req.params.id)
  res.json(book);
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books/:id', (req, res) => {
  // Reading id from the URL
  const id = req.params.id;
  const newBook = req.body;

  // Remove item from the books array
  for (let i = 0; i < books.length; i++) {
      let book = books[i]
      if (book.id === id) {
          books[i] = newBook;
      }
  }

  res.send('Book is edited');
});

app.delete('/books/:id', (req, res) => {
  // Reading id from the URL
  const id = req.params.id;

  // Remove item from the books array
  books = books.filter(i => {
      if (i.id !== id) {
          return true;
      }
      return false;
  });

  res.send('Book is deleted');
});

app.listen(port, () => console.log(`Books app listening on port ${port}!`));