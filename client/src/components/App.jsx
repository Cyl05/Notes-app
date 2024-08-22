import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    let [data, setData] = useState();

    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:3000/products");
            console.log(response.data);
            setData(response.data);
        }
        getData();
    }, []);

    return <h1>Hello World!</h1>;
}

export default App;