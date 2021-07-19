const path = require('path');
const express = require('express');
const db = require('./db/db.json');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));