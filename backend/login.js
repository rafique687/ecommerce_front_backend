const express = require('express');
const cors = require('cors'); 
const { json } = require('body-parser');
const app = express();
const PORT = 5000;

const dummyUser = {
  email: "admin@gmail.com",
  password: "123456"
};

// Middleware to parse JSON and form-urlencoded data
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login route
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //console.log("Email:", email);
  //console.log("Password:", password);

  if (email == dummyUser.email && password == dummyUser.password) {
    res.status(200).json({ message: "Login successful","status":200 });
    return json(res);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
