import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
const path = require('path');
import { Database } from "bun:sqlite";
const fs = require("fs");

function getlastid(db_name : string): number {
    var id: number;

    const db = new Database(db_name);
    var query = db.query(`SELECT id FROM users`);
    var id1 = query.all().at(-1);
    id1 = (id1 as Dict<any>).id;
    
    return parseInt(id1 as string);
}

function checkifexists(db_name: string, user: string, npub: string): boolean {
    return false;
}

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const ROOT_PATH: string = (process.env.ROOT_PATH as string);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));


async function getFile(filepath: string): Promise<string> {
    var file: string = await Bun.file(ROOT_PATH + filepath).text();
    return file;
}


app.get('/success/:id', (req, res) => {
    var id = req.params.id;
    res.writeHead(200, { "Content-Type": "text/html" });
    getFile("/src/success.html").then((file) => {
        
        res.end(file.replace("$USER", "Ole"));
    })
})
app.post('/submit', (req, res) => {
    const db = new Database("database.db");
    var id: number = getlastid("database.db") + 1;
    db.run(`INSERT INTO users (id, user, npub) VALUES (?,?,?)`, [id, req.body.username, req.body.npub]);
    console.log(`PUSHED TO DB: ID: ${id}, USERNAME: ${req.body.username}, NPUB: ${req.body.npub}`);
    res.redirect(`http://localhost:7000/success/${id}`);
    db.close()
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
