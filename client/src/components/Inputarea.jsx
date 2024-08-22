import React from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Inputarea(props) {

    return (
        <div className="input-area">
            <TextField fullWidth
                label="Insert title"
                id="fullWidth"
                name="title"
                onChange={props.handleChange}
                value={props.input.title}
            />
            <TextField fullWidth 
                name="content"
                id="outlined-multiline-static"
                label="Insert Note"
                multiline
                rows={4}
                onChange={props.handleChange}
                value={props.input.content}
            />
            <Fab color="primary" aria-label="add" size="medium" onClick={() => props.handleSubmit()}>
                <AddIcon />
            </Fab>
        </div>
    );
}