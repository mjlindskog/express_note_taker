const path = require('path');
const express = require('express');
const db = require('./db/db.json');
const fs = require('fs');

const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    const note = req.body;

    note.id = nanoid();

    let notePath = path.join(__dirname,'./db/db.json');

    db.push(note);

    fs.writeFileSync(notePath, './db/db.json', JSON.stringify(db), function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('Note Added!')
    });

    res.json(db);
});


app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));