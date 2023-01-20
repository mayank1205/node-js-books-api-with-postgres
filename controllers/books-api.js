const db = require('../util/db');
const createBook = (req, res) => {
  const book = req.body;
  book.userid = req.userid;
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
  if (req.params.id !== 'null' && req.params.id !== 'undefined') {
    const param = Number(req.params.id);
    db.select("*").from("books")
      .where("id", "=", param)
      .andWhere("userid", "=",req.userid)
      .returning("*").then(book => {
        console.log(book)
        if(book.length < 1){
          res.json({
            success: false,
            message: "no book found"
          });
        } else {
          res.json({
            success: true,
            data: book[0]
          });
        }
      })
  }
};

const getBooks = (req, res) => {
  db.select("*").from("books").where("userid", "=",req.userid).orderBy('id', 'asc').then(data => {
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