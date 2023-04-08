const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.static('public'));


// GET Route for landing page and default to index.js
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

// Get /notes for notes.html file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);


//return index.html for invalid routes
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);


//Listener for app PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
