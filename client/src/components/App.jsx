import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputarea from "./Inputarea.jsx";
import Note from "./Note.jsx";
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
    let [data, setData] = useState(); // retrieval of data
    const [input, setInput] = useState({ // getting create post input
        title: "",
        content: ""
    });
    let [editing, setEditing] = useState(null); // management of edit state

    const theme = createTheme({
        typography: {
            fontFamily: 'cursive',
        }
    });

    async function getData() {
        const response = await axios.get("http://localhost:3000/items");
        setData(response.data);
    }

    // fetch data on load
    useEffect(() => {
        getData();
    }, []); 

    function handleChange(event) {
        let { value, name } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit() {
        await axios.post("http://localhost:3000/items", {
            title: input.title,
            content: input.content
        });
        getData();
        setInput({title: "", content: ""});
    }

    async function deleteNote(id) {
        await axios.post("http://localhost:3000/delete-note", {
            id: id
        });
        getData();
    }

    async function saveNote(id, editInputs) {
        setEditing(null);
        await axios.post("http://localhost:3000/edit-post", {
            id: id,
            editTitle: editInputs.editTitle,
            editContent: editInputs.editContent
        });
        getData();
    }

    function editNote(id) {
        setEditing(id);
    }

    return (
        <ThemeProvider theme={theme}>
            <Inputarea
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                input={input}
            />
            {data ? data.map(dataItem => 
                <Note
                    key={dataItem.id}
                    id={dataItem.id}
                    title={dataItem.title}
                    content={dataItem.content}
                    editing={editing === dataItem.id}
                    /* sets editing true only for the note whose edit 
                    button got clicked, edit sends back id which gets 
                    handled by "editNote" function and id is assigned 
                    to "editing" state variable

                    Therefore, returns true if sent id matches with note id
                    */

                    deleteNote={deleteNote}
                    saveNote={saveNote}
                    editNote={editNote}
                />
            ) : null}
        </ThemeProvider>
    );
}

export default App;