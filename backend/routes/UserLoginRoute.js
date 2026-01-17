const express = require('express');
const route = express.Router();
const { userLogin, userRegister,userwhishlist } = require('../controllers/UserLoginController');
const auth = require('../middleware/Authmeddleware');

// Accept FORM-DATA or JSON for login & register
route.post('/login', userLogin);
route.post('/register', userRegister);
route.get('/whishlist', auth , userwhishlist);

module.exports = route;
