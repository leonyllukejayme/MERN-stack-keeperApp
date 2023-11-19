import { Add } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title:'', content:''});
  const [expand,setExpanded] = useState(false)
  

	function addItem(e) {
    const {name, value} = e.target;
    
    setNote((prevItems)=> {
      return {
        ...prevItems,
      [name]: value
      }
    })
	}

  async function submitNote(e){
      props.add(note);
      setNote({title:'', content:''});
      setExpanded(false);

    e.preventDefault() 
  }
 
  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {expand && <input onChange={addItem} value={note.title} name="title" placeholder="Title" required/>}
        <textarea onClick={() => setExpanded(true)} onChange={addItem} value={note.content} name="content" placeholder="Take a note..." rows={expand ? "3" : 1}  required/> 
        <Zoom in={expand}>
          <Fab type="submit" ><Add /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
