import React, {useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';

export default function Note(props) {
    let [editInputs, setEditInputs] = useState({
        editTitle: props.title,
        editContent: props.content
    });

    function handleChange(event) {
        let {name, value} = event.target;
        setEditInputs({
            ...editInputs,
            [name]: value
        });
    }

    return (
        <div className="note" style={{ fontFamily: "cursive" }}>
            {!props.editing ? <h1>{props.title}</h1> : null}

            {!props.editing ? <p>{props.content}</p> : null}

            {props.editing ? <TextField
                name="editTitle"
                id="standard-helperText"
                label="Title"
                defaultValue={props.title}
                variant="standard"
                onChange={handleChange}
            /> : null}

            {props.editing ? <TextField fullWidth
                name="editContent"
                id="standard-multiline-flexible"
                label="Note"
                multiline
                maxRows={4}
                variant="standard"
                defaultValue={props.content}
                onChange={handleChange}
            /> : null}

            <button onClick={() => props.deleteNote(props.id)}><DeleteIcon /></button>
            {props.editing ? <button><SaveIcon onClick={() => props.saveNote(props.id, editInputs)} /></button> : null}
            {!props.editing ? <button><EditIcon onClick={() => props.editNote(props.id)} /></button> : null}
        </div>
    )
}