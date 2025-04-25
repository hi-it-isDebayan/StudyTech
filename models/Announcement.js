const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    message: String,
    seenBy: [String], // Array of user IDs who have seen the announcement
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
