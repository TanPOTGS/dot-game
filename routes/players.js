const express = require('express');
const router = express.Router();
const playersCtrl = require('../controllers/players');

// GET users login
router.get('/', playersCtrl.login);

//GET users register
router.get('/register', playersCtrl.create);

module.exports = router;