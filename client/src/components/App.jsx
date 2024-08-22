import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputarea from "./Inputarea.jsx";
import Note from "./Note.jsx";
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
    let [data, setData] = useState();

    const theme = createTheme({
        typography: {
            fontFamily: 'cursive',
        }
    });

    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:3000/products");
            console.log(response.data);
            setData(response.data);
        }
        getData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Inputarea />
            <Note />
        </ThemeProvider>
    );
}

export default App;