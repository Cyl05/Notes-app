import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';

export default function Note(props) { 
    return (
        <div className="note" style={{fontFamily: "cursive"}}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => props.deleteNote(props.id)}><DeleteIcon /></button>
        </div>
    )
}