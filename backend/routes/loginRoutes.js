const express = require('express');
const router = express.Router();

const {
userlogin
} = require('../controllers/loginController');

// POST route
router.post('/', userlogin);


module.exports = router; 
