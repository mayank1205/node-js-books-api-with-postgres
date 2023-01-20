const express = require('express'); //import express
const { createBook, getBookById, getBooks, updateBook, deleteBook } = require('../controllers/books-api');

// 1.
const router  = express.Router(); 

router.post('', (req, res) => {
    createBook(req, res);
  });
  
router.get(`/:id`, (req, res) => getBookById(req, res))
  
router.get('', (req, res) => getBooks(req, res))
  
router.put('/:id', (req, res) => updateBook(req, res));
  
router.delete('/:id', (req, res) => deleteBook(req, res));

module.exports = router;