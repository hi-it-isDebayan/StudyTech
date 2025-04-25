const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    code: String,
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
