//const fb set to require express router
const fb = require('express').Router(); 

const fs = require('fs');

//decontructing assignment from dsUtils helper with required functions 
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');

//importing uuid helper for creating unique ids
const uuid = require('../helpers/uuid.js');

//assigning db.json to notes variable for use in api routes 
const notes = require('../db/db.json');


//Get for queries on api/notes
fb.get('/:id', (req, res) => {
    //if id parameter is present 
    if (req.params.id) {
        console.info(`${req.method} request received to get a single a note`);
        const noteId = req.params.id;
        
        //loop through notes and find the note that matches the id parameter
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.id === noteId) {
                //send response 200 that indicates note has been found and end
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
    //read from db.json file, if there is data parse json data in json response
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

        //calls readAndAppend helper from fs.utils 
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success!',
            body: newNote,
        };

        //send success response with new note to the terminal
        res.json(response);
    } else {
        res.json('Error in posting new note')
    }
});

//DELETE route for deleting selecting notes
fb.delete('/:id', (req, res) => {
    //check to see if there is an id in the url
    if(req.params.id) {
        const noteId = req.params.id;

        //for loop to loop through db.json file until object with request id is located
        for(let i=0; i<notes.length; i++) {
            const currentNote = notes[i];
            if(currentNote.id === noteId){
                //if id is located, splice to remove located object from the array
                notes.splice(i,1);
            }
        }

        //write updated object array back to db.json file 
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
        err ? console.log(err) : console.log('Notes json file successfully updated!')
        );
    }
    res.json('Delete request complete.');
});

module.exports = fb;