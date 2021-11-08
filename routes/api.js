const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4} = require("uuid")


const routerNote = express.Router();

function getDb() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "../Develop/db/db.json"), 'utf8'));
}

routerNote.get('/api/notes', (req, res) => {
    res.json(getDb());
});

routerNote.post('/api/notes', (req, res) => {
    const newNote = { 
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }; 

    const notes = JSON.stringify(getDb().concat([newNote]));
    
    fs.writeFile(path.join(__dirname, "../Develop/db/db.json"), notes, function(err) {
        if(err) {
            return console.log(err); 
        }
        console.log(`SUCCESS! ${req.body.title} added`);
        res.json(newNote);
    });
})



module.exports = routerNote;