const usercreddb = require('../models/usercreddb');
const whishlist = require('../models/whishlist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGIN
exports.userLogin = async (req, res) => {
    const { useName, password } = req.body;
    //console.log("username",useName);
    //return res.status(200).json({ message: "login successful"})
    try {
        // Find user
        const user = await usercreddb.findOne({ email:useName });
        //const user = await usercreddb.findOne({ email: userName });

       // console.log('result:', user);
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// REGISTER
exports.userRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await usercreddb.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new usercreddb({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.userwhishlist= async(req,res) => {

    const {item_id,token} =req.body;
    const whishlist = new whishlist({ it})
   // console.log(req.body);
}
