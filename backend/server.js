require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes');
const app = express();

const port = process.env.PORT || 8080;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Welcome to the Server');
});

app.use('/api/notes', notesRoutes);

// const note = new Note({
//     title: "Arrays",
//     content:
//       "Q. Why did the programmer quit his job? A. Because he didn't get arrays."
// });

// note.save().then(()=> {console.log("saved")})

mongoose.set('strictQuery', false);
mongoose
	.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/keeperDB')
	.then(() => {
		console.log('Connected to Database');
		app.listen(port, () => {
			console.log(`Listening to port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err.messsage);
	});
