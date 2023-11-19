import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

const Note = (props) => {
  return (
    <div className="note">
        <h1>{props.notes.title}</h1>
        <p>{props.notes.content}</p>
        <button onClick={()=> props.delete(props.id)}><DeleteIcon /></button>
    </div>
  )
}

export default Note
