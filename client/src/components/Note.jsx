import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';

export default function Note() { 
    return (
        <div className="note" style={{fontFamily: "cursive"}}>
            <h1>a</h1>
            <p>a</p>
            <button onClick={() => props.deleteNote(props.id)}><DeleteIcon /></button>
        </div>
    )
}