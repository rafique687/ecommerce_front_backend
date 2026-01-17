const Login = require('../models/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
   //-------------------------------------------------
   const plainPassword = "123456";
    const saltRounds = 10;

    // Hash manually
    // const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    // console.log('generated',hashedPassword);
   //-------------------------------------------------

    const user = await Login.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid credentials password not matched' });
    // }
  console.log(user);
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  userlogin
};
