var express = require('express');
var router = express.Router();
// Connecting to DB imports
const sqlite = require('sqlite3').verbose();

// Connecting to DB
const db = new sqlite.Database('./database.sqlite', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Yay! You are connected to the database!');
 });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
