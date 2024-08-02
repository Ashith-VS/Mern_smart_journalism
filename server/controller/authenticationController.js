const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserData = require("../model/AuthenticationModel");

const isRegister = async (req, res) => {
    try {
        const { name, email, mobile, password,role,mediaAdmin } = req.body;
        console.log('req.body: ', req.body);
         // Validate input (example validation)
         if (!name || !email || !mobile || !password ) {
            return res.status(400).json({ status: 400, message: 'All fields are required' });
        }
         // Check if email already exists
         const existingUser = await UserData.findOne({ email });
         if (existingUser) {
             return res.status(400).json({ status: 400, message: 'Email already in use' });
         }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserData({ name, email, mobile, password: hashedPassword,role,mediaAdmin });
        await newUser.save();
        res.status(201).json({ status: 200, message: 'User registered successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

const isLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserData.findOne({ email });
        // console.log('user: ', user);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: 'Invalid credentials' });
        // Generate JWT token for the authenticated user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        console.log('token: ', token);
        res.json({ status: 200, message: 'User logged in successfully', token: token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

const isCurrentUser = async (req, res) => {
    try {
        const user = await UserData.findById(req.id).select('-password -blocked'); //remove password from user
        // console.log('user44: ', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: 200, user })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error retrieving user data' });
    }
}

module.exports = { isRegister, isLogin, isCurrentUser }