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
  book.id = books.length+1
  books.push(book);

  res.send({
    success: true,
    message: 'Book is added to the database',
    data: books
  });
});

app.get(`/books/:id`, (req, res) => {
  console.log('this is id ', req.params.id)
  let book = _.find(books, (b) => b.id = req.params.id)
  res.json({
    success: true,
    data: book
  });
});

app.get('/books', (req, res) => {
  res.json({
    success: true,
    data: books,
    count: books.length
  });
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

  res.send({
    success: true,
    data: newBook,
    message: 'Book is edited'
  });
});

app.delete('/books/:id', (req, res) => {
  // Reading id from the URL
  const id = req.params.id;
  console.log(id)

  // Remove item from the books array
  books = books.filter(i => i.id != id);
  console.log(books)
  res.send({
    success: true,
    message: 'Book is deleted',
    data: books
  });
});

app.listen(port, () => console.log(`Books app listening on port ${port}!`));