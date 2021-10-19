const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const port = 3000;
const { createBook, getBookById, getBooks, updateBook, deleteBook } = require('./books-api');


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post('/book', (req, res) => {
  createBook(req, res);
});

app.get(`/books/:id`, (req, res) => getBookById(req, res))

app.get('/books', (req, res) => getBooks(req, res))

app.put('/books/:id', (req, res) => updateBook(req, res));

app.delete('/books/:id', (req, res) => deleteBook(req, res));

app.listen(port, () => console.log(`Books app listening on port ${port}!`));