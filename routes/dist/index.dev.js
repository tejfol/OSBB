"use strict";

var express = require('express');

var _require = require('express'),
    Router = _require.Router;

var router = express.Router();
router.get('/', function (req, res) {
  res.render('index');
});
module.exports = router;