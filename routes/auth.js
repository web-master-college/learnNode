const express = require('express');
const router = express.Router();
const AuthConroller = require('../controllers/Auth');


router.get('/login', AuthConroller.login);


module.exports = router;