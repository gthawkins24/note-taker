const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const generateID = require('generate-unique-id');
const PORT = process.env.PORT || 3001;
const { notes } = require("./db/db");

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

const newNote = (body, notes) => {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );
    return note;
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = generateID();
    const note = newNote(req.body, notes);
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});
