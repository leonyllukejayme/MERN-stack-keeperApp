const Note = require('../models/notesModel');

const getNotes = async (req, res) => {
	try {
		const notes = await Note.find({});
		res.status(200).json(notes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createNote = async (req, res) => {
	try {
		const note = await Note.create(req.body);
		res.status(200).json(note);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteNote = async (req, res) => {
	const { id } = req.params;
	try {
		const note = await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({message: `Cannot find note with an id ${id}`})
        }
        res.status(200).json(note);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getNotes,
	createNote,
	deleteNote,
};
