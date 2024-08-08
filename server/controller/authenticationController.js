const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserData = require("../model/AuthenticationModel");
const { blacklistToken } = require('../middleware/VerifyMiddleware');


const isRegister = async (req, res) => {
    try {
        const { name, email, mobile, password, role, mediaAdmin } = req.body;
        // Validate input (example validation)
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ status: 400, message: 'All fields are required' });
        }
        // Check if email already exists
        const existingUser = await UserData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: 'Email already in use' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserData({ name, email, mobile, password: hashedPassword, role, mediaAdmin });
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
        if (!user) return res.status(404).json({ status: 404, message: 'User not found' });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ status: 400, message: 'Invalid credentials' });
        // Generate JWT token for the authenticated user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // console.log('token: ', token);
        // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //     if (err) return res.status(401).json({ error: 'Invalid or expired token' });
        //     // Proceed with request
        // });
        res.status(200).json({ status: 200, message: 'User logged in successfully', token: token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

const isCurrentUser = async (req, res) => {
    try {
        const user = await UserData.findById(req.id).select('-password -blocked'); //remove password from user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: 200, user })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error retrieving user data' });
    }
}

const isChangePassword = async (req, res) => {
    try {
        //  console.log('verifytoken ', req.id);
        const { currentPassword, newPassword } = req.body.formData;
        const user = await UserData.findById(req.id);
        // console.log('user: ', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        // console.log('passwordMatch: ', passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'current password is incorrect' });
        }
        // Check if the new password is the same as the current password
        if (await bcrypt.compare(newPassword, user.password)) {
            return res.status(400).json({ message: 'New password cannot be the same as the current password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.log('error: ', error.message);
        res.status(500).json({ message: 'Error changing password' })
    }

}


const isUpdateProfile = async (req, res) => {
    try {
        const { name, email, mobile, image } = req.body.formData;
        const user = await UserData.findByIdAndUpdate(req.id, { name, email, mobile, image }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error updating user profile' });
    }
}


const isLogOut = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (token) {
            blacklistToken(token); // Add token to the blacklist with an expiry time
        }
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error logging out' });
    }
}


module.exports = { isRegister, isLogin, isCurrentUser, isChangePassword, isUpdateProfile, isLogOut }