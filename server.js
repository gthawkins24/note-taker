const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const generateID = require('generate-unique-id');
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

const newNote = (body, notes) => {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes })
    );
};

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
