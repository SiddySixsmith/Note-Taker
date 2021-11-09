const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid");


/**
 * 
 * @returns {Array <{
 *      id: string, 
 *      title: string, 
 *      text: string
 * }>}
 */

function getNotesFromDb(){
    const notePath = path.join(__dirname, "../../db/db.json")
    return JSON.parse(fs.readFileSync(notePath, "utf-8"));
}

function saveNotesToDb(notes){
    return fs.writeFileSync(notePath, JSON.stringify(notes));

}

router.get("/api/notes", function(req, res){
const notes = getNotesFromDb();
res.json(notes);
});

router.get("/api/notes/:id", function(req, res){
    const notes = getNotesFromDb();
    const found = notes.find((note) => note.id === req.params.id)

    if  (!found){
        res.status(400).json({
            error: "not found"
        })
    }
    res.json(found);
});

router.post("/api/notes", function(req, res){
    const notes = getNotesFromDb();

    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
    }

    const updateNotes = {
        ...notes,
        newNote
    }

    saveNotesToDb(updateNotes);
    
    res.json({
        data:"ok"
    })
})
router.put("/api/notes", function(req, res){
    const notes = getNotesFromDb();

   const foundIndex =  notes.findIndex((note) => note.id === req.params.id);
   if  (foundIndex === 0){
    res.status(400).json({
        error: "not found"
    })
}

const noteToUpdate = { ...notes[foundIndex]}

noteToUpdate.text = req.body.text || noteToUpdate.text;
noteToUpdate.title = req.body.title || noteToUpdate.title;

const updatedNotes = [
    ...notes.slice(0, foundIndex),
    noteToUpdate,
    ...notes.slice(foundIndex + 1)
]

saveNotesToDb(updatedNotes)

res.json(noteToUpdate)
});
router.delete("/api/notes", function(req, res){
    const notes = getNotesFromDb();

    const foundIndex =  notes.findIndex((note) => note.id === req.params.id);
    if  (foundIndex === 0){
     res.status(400).json({
         error: "not found"
     })
 };

 const updatedNotes = [
    ...notes.slice(0, foundIndex),
    ...notes.slice(foundIndex + 1)
];

saveNotesToDb(updatedNotes)

res.json({
    data: "ok"
})

})

module.exports = router;