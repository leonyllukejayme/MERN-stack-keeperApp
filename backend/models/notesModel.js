const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        reqired: true
    }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
