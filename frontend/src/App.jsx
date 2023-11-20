import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateArea from './components/CreateArea';
import Footer from './components/Footer';
import Header from './components/Header';
import Note from './components/Note';

function App() {
	const [notes, setNotes] = useState([]);


	useEffect(() =>{
		async function getNotes() {
			try {
				const response = await axios.get('https://mern-stack-keeperapp.onrender.com/api/notes/');
				const result = response.data;
				// console.log(result)
				setNotes(result);
			} catch (err) {
				console.log(err.message)
			}
	
		}
		getNotes();
	},[])

	async function addNote(note) {	
		// console.log(note)
		try {
			const response =  await axios.post('https://mern-stack-keeperapp.onrender.com/api/notes/', note, {
			  headers:{
				'Content-Type': 'application/json'
			  }
			})
			const result = response.data;
			note._id = result._id;
			// console.log(result._id)
			// console.log(result);
		  } catch (err) {
			console.log(err.message)
		  }
		setNotes((prevNotes) => {
			return [...prevNotes, note];
		});
	}

	async function deleteNote(id) {	

		try {
			const response =  await axios.delete(`https://mern-stack-keeperapp.onrender.com/api/notes/${notes[id]._id}`)
			const result = response.data;
			// console.log(result)
		} catch (err) {
			console.log(err.message)
		}
		setNotes((prevNotes) => {
			return prevNotes.filter((note, i) => {
				return i !== id;
			});
		});
	}

	return (
		<div className='container'>
			<Header />
			<CreateArea add={addNote} />
			<div>
			{notes.map((note, i) => {
				return (
					<Note
						key={note._id}
						id={i}
						notes={note}
						delete={deleteNote}
					/>
				);
			})}	
			</div>

			<Footer />
		</div>
	);
}

export default App;
