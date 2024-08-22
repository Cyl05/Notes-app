import React from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Inputarea() {
    return (
        <div className="input-area">
            <TextField fullWidth label="Insert title" id="fullWidth" />
            <TextField fullWidth
                id="outlined-multiline-static"
                label="Insert Note"
                multiline
                rows={4}
                defaultValue="Default Value"
            />
            <Fab color="primary" aria-label="add" size="medium">
                <AddIcon />
            </Fab>
        </div>
    );
}