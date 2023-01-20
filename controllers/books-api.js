const db = require('../util/db');
const createBook = (req, res) => {
  const book = req.body;
  db("books").insert(book).returning("*")
    .then((resp) => {
      console.log(resp);
      res.send({
        success: true,
        message: 'Book is added to the database',
        data: resp[0]
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        message: "unable to create a new book"
      });
    });
}

const getBookById = (req, res) => {
  console.log('this is id ', req.params)
  if (req.params.id !== 'null' && req.params.id !== 'undefined') {
    console.log('coming in??????')
    const param = Number(req.params.id);
    console.log(param);
    db.select("*").from("books")
      .where("id", "=", param)
      .returning("*").then(book => {
        res.json({
          success: true,
          data: book[0]
        });
      })
  }
};

const getBooks = (req, res) => {
  db.select("*").from("books").then(data => {
    res.json({
      success: true,
      data: data,
      count: data.length
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json(err)
  });
};

const updateBook = (req, res) => {
  // Reading id from the URL
  let id = req.params.id;
  const newBook = req.body;

  db("books")
    .where("id", "=", id).update(newBook)
    .returning("*").then(() => {
      res.send({
        success: true,
        data: newBook,
        message: 'Book is edited'
      });
    })
};

const deleteBook = (req, res) => {
  // Reading id from the URL
  const id = req.params.id;
  console.log(id)

  // Remove item from the books array
  db("books")
    .where("id", "=", id).delete()
    .returning("*").then((books) => {
      res.send({
        success: true,
        message: 'Book is deleted',
        data: books
      });
    })
};
module.exports = {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
}