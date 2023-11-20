import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateArea from './components/CreateArea';
import Footer from './components/Footer';
import Header from './components/Header';
import Note from './components/Note';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function App() {
	const [notes, setNotes] = useState([]);
	var proxy = import.meta.env.VITE_PROXY || ''

	useEffect(() =>{
		async function getNotes() {
			try {
				const response = await axios.get(proxy + '/api/notes/');
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
			const response =  await axios.post(proxy + '/api/notes/', note, {
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
			const response =  await axios.delete(proxy + `/api/notes/${notes[id]._id}`)
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
			<div className='container2'>
			{notes.length > 0 ? notes.map((note, i) => {
				return (
					<Note
						key={note._id}
						id={i}
						notes={note}
						delete={deleteNote}
					/>
				);
			}) : <div className="empty"> 
				<TextSnippetIcon className='emptyNotes' style={{ fontSize:"200px" }} />	
				<h1 className='emptyNotes'>Notes you add appear here</h1>
			</div> }	
			</div>

			<Footer />
		</div>
	);
}

export default App;
