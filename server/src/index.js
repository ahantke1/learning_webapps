//Add required packages
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create db object
const db = mysql.createPool({
    host: 'mysql_db', // the db host name
    user: 'MYSQL_USER', // db user
    password: 'MYSQL_PASSWORD', // db user password
    database: 'books' // database instance
  })

// Create server object
const app = express();

// enable CORS headers
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS - to learn more
app.use(cors())

// Have server parse json
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/*******************************
  Routes/API
  https://en.wikipedia.org/wiki/Routing - to learn more about routes
  https://en.wikipedia.org/wiki/API - to learn more about APIs (REST is most common type)
  https://www.ibm.com/topics/rest-apis - to learn more about the rest api specification
*******************************/


// Root
app.get('/', (req, res) => {
    res.send('Hi There')
  });

// Read entire DB
app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM books_reviews";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
  })

// Add to DB
app.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
      console.log(result)
    })
  })

// Remove from the db
app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
      if (err) console.log(err);
    })
  })

// Update value in DB
app.put("/update/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
      if (err) console.log(err)
    })
  })

/*******************************
  End of API spec
*******************************/

module.exports = app;