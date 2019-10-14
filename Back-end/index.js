const express = require('express');
const app = express();

app.use(express.json());

const characters = require('./routes/characters');
app.use('/api/characters', characters);

const staff = require ('./routes/staff');
app.use('/api/staff', staff);

const students = require ('./routes/students');
app.use('/api/students', students);

const houses = require('./routes/houses');
app.use('/api/houses', houses);

const movies = require('./routes/movies');
app.use('/api/movies', movies);

const magicalobjects = require('./routes/magicalobjects');
app.use('/api/magicalobjects', magicalobjects);

const magicalcreatures = require('./routes/magicalcreatures');
app.use('/api/magicalcreatures', magicalcreatures);

const spells = require('./routes/spells');
app.use('/api/spells', spells);

// Admin

const login = require('./routes/login');
app.use('/api/login', login);

/*
const bcrypt = require('bcryptjs');
(async () =>{
try {
const hash = await bcrypt.hash('admin', 10);
console.log(hash);
} catch (err) {
 
}})();
*/

app.listen(8213, () => console.log(`Listening on port: 8213 ...`));