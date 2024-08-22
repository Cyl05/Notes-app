import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputarea from "./Inputarea.jsx";
import Note from "./Note.jsx";
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
    let [data, setData] = useState();
    const [input, setInput] = useState({
        title: "",
        content: ""
    });
    let [notes, setNotes] = useState(false);

    const theme = createTheme({
        typography: {
            fontFamily: 'cursive',
        }
    });

    async function getData() {
        const response = await axios.get("http://localhost:3000/items");
        console.log(response.data);
        setData(response.data);
        setNotes(true);
    }

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
        const response = await axios.post("http://localhost:3000/items", {
            title: input.title,
            content: input.content
        });
        getData();
        setInput({title: "", content: ""});
    }

    async function deleteNote(id) {
        const response = await axios.post("http://localhost:3000/delete-note", {
            id: id
        });
        getData();
    }

    return (
        <ThemeProvider theme={theme}>
            <Inputarea
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                input={input}
            />
            {notes ? data.map(dataItem => 
                <Note
                    key={dataItem.id}
                    id={dataItem.id}
                    title={dataItem.title}
                    content={dataItem.content}
                    deleteNote={deleteNote}
                />
            ) : null}
        </ThemeProvider>
    );
}

export default App;