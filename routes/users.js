var express = require('express');
var router = express.Router();
// Connecting to DB imports
const sqlite = require('sqlite3').verbose();
// Auth Models
var models = require('../models');
const auth = require("../config/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
