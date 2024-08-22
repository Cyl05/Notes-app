import cors from "cors";
import express from "express";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

// The client will be blocked from making requests to the server without this module for some fucking reason
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parsing of the axios posts into JSON for operations


app.get("/", (req, res) => {
    res.json("Hello world!");
});

app.get("/items", async (req, res) => {
    const response = await db.query("SELECT * FROM items ORDER BY id ASC");
    res.json(response.rows);
});

app.post("/items", async (req, res) => {
    try {
        await db.query("INSERT INTO items (title, content) VALUES ($1, $2)", [req.body.title, req.body.content]);
        res.sendStatus(200);
    } catch (err) {
        console.log(`Error ocurred when inserting data: ${err}`);
        res.sendStatus(500);
    }
});

app.post("/delete-note", async(req, res) => {
    try {
        await db.query("DELETE FROM items WHERE id = $1", [req.body.id]);
        res.sendStatus(200);
    } catch (err) {
        console.log(`Error ocurred when deleting note ${req.body.id} : ${err}`);
        res.sendStatus(500);
    }
});

app.post("/edit-post", async (req, res) => {
    let {editTitle, editContent, id} = req.body;
    try {
        await db.query("UPDATE items SET title=$1, content=$2 WHERE id=$3", [editTitle, editContent, id]);
        res.sendStatus(200);
    } catch (err) {
        console.log(`Error updating values: ${err}`);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});