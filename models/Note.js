const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    date: String,
    content: String, // URL or file path to the note
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
