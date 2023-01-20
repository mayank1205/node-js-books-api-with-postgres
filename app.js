require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const port = 3000;
const bookRoutes = require('./routes/books')
const authRoutes = require('./routes/users')
const verifyToken = require('./middleware/verify')


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.use('/books', verifyToken, bookRoutes)

app.use('/users', authRoutes)

app.listen(port, () => console.log(`Books app listening on port ${port}!`));