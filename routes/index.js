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

// Sample Routing
router.get('/test', (req, res) => {

  res.send({ message: "Hello Frontend! This is backend speaking." });

});

router.get('/get-users', (req, res) => {

  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {

    if(err) throw err;
    res.send(row);

  });

});

// Display Classes
router.get('/get-class', (req, res) => {

  const query = "SELECT * FROM classes";
  db.all(query, (err, row) => {

    if(err) throw err;
    res.send(row);

  });

});

// Add Classes
router.get('/add-class', (req, res) => {

  let newClassName = req.params.class;

  const className = db.prepare(`INSERT INTO classes (Class) VALUES (?)`);
  className.run(newClassName);

    db.all(`SELECT * FROM classes ORDER BY UserId;`, (err, row) => {

    if (err) throw err;
    res.send(row);

  });

});

// Update Profile
router.get('/update-profile/:userNameBefore/:userNameAfter', (req, res, next) => {
  let nameBefore = req.params.userNameBefore;
  let nameAfter = req.params.userNameAfter;

  let update = `UPDATE users SET FirstName = '${nameAfter}' WHERE FirstName LIKE '%${nameBefore}%'`;

  db.all(update, (err, row) => {
    if(err) throw err;
  })
});

module.exports = router;
