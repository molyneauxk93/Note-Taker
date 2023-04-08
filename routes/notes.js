const fb = require('express').Router();

const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');

const uuid = require('../helpers/uuid.js');

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
            note_id: uuid(),
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

module.exports = fb;