const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'user' },
    blocked: { type: Boolean, default: false },
    status: { type: String, default: "active" },
    mediaAdmin: { type: String },
    savedNews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
    image: { type: String },
    parent: { type: String},
    mustResetPassword: { type: Boolean }
});

const UserData = mongoose.model('User', UserSchema);
module.exports = UserData