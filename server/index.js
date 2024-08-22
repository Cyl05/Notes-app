import cors from "cors";
import express from "express";
import pg from "pg";
import env from "dotenv";

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

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/", (req, res) => {
    res.json("Hello world!");
});

app.get("/products", async (req, res) => {
    const response = await db.query("SELECT * FROM items");
    res.json(response.rows);
});

app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});