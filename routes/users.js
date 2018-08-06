var express = require('express');
var router = express.Router();
// Connecting to DB imports
const sqlite = require('sqlite3').verbose();
// Auth Models
var models = require('../models');
const auth = require("../config/auth");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Adds new user to table using "/signup" route
router.get("/signup", function (req, res, next) {
  res.render('signup')
});

router.post('/signup', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.send('this user already exists')
    } else {
      models.users.create({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Address: req.body.address,
        Email: req.body.email,
        Phone: req.body.phone,
        Role: req.body.role,
        Username: req.body.username,
        Password: req.body.password
      }).then(createdUser => {
        const isMatch = createdUser.comparePassword(req.body.password);

        if (isMatch) {
          const userId = createdUser.UserId
          const token = auth.signUser(createdUser);
          res.cookie('jwt', token);
          res.redirect('profile/' + userId)
        } else {
          console.error('not a match');
        }

      });
    }
  });

});

// Logs in user using "/login" route
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    const isMatch = user.comparePassword(req.body.password)

    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (isMatch) {
      const userId = user.UserId
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.redirect('profile/' + userId)
    } else {
      console.log(req.body.password);
      res.redirect('login')
    }

  });
});

// Verify user's profile by using "/profile/:id" route
router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.UserId)) {
    res.send('This is not your profile')
  } else {
    res.render('profile', {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Address: req.user.Address,
      Email: req.user.Email,
      Phone: req.user.Phone,
      Role: req.user.Role,
      UserId: req.user.UserId,
      Username: req.user.Username
    });
  }

});

// Log out route
router.get('/logout', function (req, res) {
  res.cookie('jwt', null);
  res.redirect('/users/login');
});

module.exports = router;