const express = require('express');
const path = require('path');

//api route for index.js
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// GET Route for landing page and default to index.js
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get /notes for notes.html file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//return index.html for invalid routes
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


//Listener for app PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
