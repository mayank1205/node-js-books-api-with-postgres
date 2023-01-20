const express = require('express'); //import express
const { login, signup  } = require('../controllers/auth-api');

// 1.
const router  = express.Router(); 

router.post('', (req, res) => {
    createBook(req, res);
  });
  
router.post(`/signup`, (req, res) => signup(req, res))
  
router.post('/login', (req, res) => login(req, res))
  

module.exports = router;