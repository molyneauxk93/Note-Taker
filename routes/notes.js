const fb = require('express').Router();

const fs = require('fs');

const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');

const uuid = require('../helpers/uuid.js');

const notes = require('../db/db.json');


//Get for queries on api/notes
fb.get('/:id', (req, res) => {
    if (req.params.id) {
        console.info(`${req.method} request received to get a single a note`);
        const noteId = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.id === noteId) {
                res.status(200).json(currentNote);
                return;
            }
        }
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    }
});

//GET route for retrieving notes 
fb.get('/', (req,res) =>
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
);

fb.post('/', (req,res) => {

    //deconstructing assignment for the items in req.body

    const { title, text } = req.body;

    //if all the required properties are present 
    if(title && text) {
        //variable for the object to be saved 
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success!',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting new note')
    }
});

//DELETE route for deleting selecting notes
fb.delete('/:id', (req, res) => {
    if(req.params.id) {
        const noteId = req.params.id;

        
        for(let i=0; i<notes.length; i++) {
            const currentNote = notes[i];
            if(currentNote.id === noteId){
                updtNotes = notes.splice(i,1);
            }
        }

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
        err ? console.log(err) : console.log('Notes json file successfully updated!')
        );
    }
    res.json('Delete request complete.');
});

module.exports = fb;