import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
const path = require('path');
import { Database } from "bun:sqlite";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'));
app.get('/success/:id', (req, res) => {
    res.send(`NICE! ID: ${req.params.id}`)
})
app.post('/submit', (req, res) => {
    const db = new Database("database.db");
    var id = 5
    db.run(`INSERT INTO users (id, user, npub) VALUES (?,?,?)`, [5, req.body.username, req.body.npub], () => {
        res.send("WORKS");
    });
    const test = req.body.username;
    console.log(test)
    res.redirect(`http://localhost:7000/success/${id}`)
    db.close()
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
