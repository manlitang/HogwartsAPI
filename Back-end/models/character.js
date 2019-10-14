const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const Joi = require('@hapi/joi');
const _ = require('lodash');

const DEBUG = config.get('DEBUG');

class Character {
    constructor(obj) {
        this.id = obj.id;
        this.fname = obj.fname;
        this.lname = obj.lname;
        this.aka = obj.aka;
        this.gender = obj.gender;
        this.bloodstatus = obj.bloodstatus;
        this.birth = obj.birth;
        this.death = obj.death;
        this.pet = obj.pet;
        this.wand = obj.wand;
        this.patronus = obj.patronus;
        this.boggart = obj.boggart;
        this.quote = obj.quote;
        this.movie = obj.movie;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            fname: Joi.string().min(3).max(50).required(),
            lname: Joi.string().min(3).max(50).required(),
            aka: Joi.string().min(3).max(255),
            gender: Joi.string().min(3).max(50),
            bloodstatus: Joi.string().min(3).max(50),
            birth: Joi.string().min(3).max(50),
            death: Joi.string().min(3).max(50),
            pet: Joi.string().min(3).max(50),
            wand: Joi.string().min(3).max(255),
            patronus: Joi.string().min(3).max(50),
            boggart: Joi.string().min(3).max(255),
            quote: Joi.string().min(3),
            movie: Joi.string().min(3).max(255)
        });
        if (obj.id) {
            schema = schema.append({
                id: Joi.number().integer().min(1).required()
            });
        }

        return schema.validate(obj);
    }

    static readAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await sql.connect(con);

                const foundCharacters = await pool.request()
                    .query('SELECT * FROM Character');

                let characters = [];
                for (let i = 0; i < foundCharacters.recordset.length; i++) {
                    const character = {
                        id: foundCharacters.recordset[i].CharacterID,
                        fname: foundCharacters.recordset[i].CharacterFirstName,
                        lname: foundCharacters.recordset[i].CharacterLastName
                    }
                    if (foundCharacters.recordset[i].CharacterAlsoKnownAs) character.aka = foundCharacters.recordset[i].CharacterAlsoKnownAs;

                    const { error } = Character.validate(character);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Character ${ character.fname } does not validate from DB'
                    }

                    characters.push(new Character(character));
                }

                resolve(characters);

            } catch (err) {
                const errSchema = Joi.object().keys({
                    code: Joi.number().integer().min(400).max(600).required(),
                    message: Joi.any()
                });
                let errorObj = {
                    code: err.code,
                    message: err.message
                }
                const { error } = errSchema.validate(errorObj);
                if (error) {
                    errorObj.code = 500;
                    errorObj.message = `Internal server error: ${err.message}`;
                }

                reject(errorObj);
            }
            sql.close();
        });
    }

    static readById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await sql.connect(con);
                const foundCharacters = await pool.request()
                    .input('id', sql.Int, id)
                    .query('SELECT Character.CharacterID, Character.CharacterFirstName, Character.CharacterLastName, Character.CharacterAlsoKnownAs, Character.CharacterGender, Character.CharacterBloodStatus, Character.CharacterDateOfBirth, Character.CharacterDateOfDeath,Character.CharacterPet, Character.CharacterWand, Character.CharacterPatronus, Character.CharacterBoggart, Character.CharacterQuote, Movie.MovieName FROM  Character JOIN Character_In_Movie ON Character.CharacterID = Character_In_Movie.FK_CharacterID JOIN Movie ON Character_In_Movie.FK_MovieID = Movie.MovieID WHERE CharacterID = @id')

                let characters = [];
                for (let i = 0; i < foundCharacters.recordset.length; i++) {

                    const character = {
                        id: foundCharacters.recordset[i].CharacterID,
                        fname: foundCharacters.recordset[i].CharacterFirstName,
                        lname: foundCharacters.recordset[i].CharacterLastName,
                        gender: foundCharacters.recordset[i].CharacterGender,
                        bloodstatus: foundCharacters.recordset[i].CharacterBloodstatus,
                        birth: foundCharacters.recordset[i].CharacterDateOfBirth,
                        quote: foundCharacters.recordset[i].CharacterQuote,
                        movie: foundCharacters.recordset[i].MovieName

                    }
                    if (foundCharacters.recordset[i].CharacterAlsoKnownAs) character.aka = foundCharacters.recordset[i].CharacterAlsoKnownAs;
                    if (foundCharacters.recordset[i].CharacterDateOfDeath) character.death = foundCharacters.recordset[i].CharacterDateOfDeath;
                    if (foundCharacters.recordset[i].CharacterPet) character.pet = foundCharacters.recordset[i].CharacterPet;
                    if (foundCharacters.recordset[i].CharacterWand) character.wand = foundCharacters.recordset[i].CharacterWand;
                    if (foundCharacters.recordset[i].CharacterPatronus) character.patronus = foundCharacters.recordset[i].CharacterPatronus;
                    if (foundCharacters.recordset[i].CharacterBoggart) character.boggart = foundCharacters.recordset[i].CharacterBoggart;

                    const { error } = Character.validate(character);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Character ${ character.name } does not validate from DB'
                    }

                    characters.push(new Character(character));
                }

                const newcharacters = [];
                const firstItem = _.omit(characters[0], ['movie']);
                firstItem.movies = new Array();
                firstItem.movies.push(characters[0].movie);
                newcharacters.push(firstItem);
                for (let i = 1; i < characters.length; i++) {
                    const lastIndex = newcharacters.length - 1;
                    if (newcharacters[lastIndex].id !== characters[i].id) {

                        const item = _.omit(characters[i], ['movie']);
                        item.movies = new Array();
                        item.movies.push(characters[i].movie);

                        newcharacters.push(item);

                    }
                    else {
                        newcharacters[lastIndex].movies.push(characters[i].movie);
                    }
                }
                resolve(newcharacters);



            } catch (err) {
                const errSchema = Joi.object().keys({
                    code: Joi.number().integer().min(400).max(600).required(),
                    message: Joi.any()
                });
                let errorObj = {
                    code: err.code,
                    message: err.message
                }
                const { error } = errSchema.validate(errorObj);
                if (error) {
                    errorObj.code = 500;
                    errorObj.message = `Internal server error: ${err.message}`;
                }

                reject(errorObj);
            }
            sql.close();
        });
    }

    create() {
        const obj = this;
        return new Promise(async (resolve, reject) => {
            if (DEBUG) console.log('models/character: create ... started');
            try {
                const pool = await sql.connect(con);
                if (DEBUG) console.log('models/character: create ... pool successful');
    
                const characterExists = await pool.request()
                    .input('fname', sql.NVarChar(50), obj.fname)
                    .input('lname', sql.NVarChar(50), obj.lname)
    
                    .query('SELECT * FROM Character WHERE CharacterFirstName = @fname AND CharacterLastName = @lname');
                if (characterExists.recordset[0]) throw { code: 409, message: 'Conflict. Character already exists' }
    
                const insertCharacter = await pool.request()
                    .input('fname', sql.NVarChar(50), obj.fname)
                    .input('lname', sql.NVarChar(50), obj.lname)
                    .input('aka', sql.NVarChar(255), obj.aka)
                    .input('gender', sql.NVarChar(50), obj.gender)
                    .input('bloodstatus', sql.NVarChar(50), obj.bloodstatus)
                    .input('birth', sql.NVarChar(50), obj.birth)
                    .input('death', sql.NVarChar(50), obj.death)
                    .input('pet', sql.NVarChar(50), obj.pet)
                    .input('wand', sql.NVarChar(255), obj.wand)
                    .input('patronus', sql.NVarChar(50), obj.patronus)
                    .input('boggart', sql.NVarChar(255), obj.boggart)
                    .input('quote', sql.NVarChar(), obj.quote)
                    .query('INSERT INTO Character (CharacterFirstName, CharacterLastName, CharacterAlsoKnownAs, CharacterGender, CharacterBloodStatus, CharacterDateOfBirth, CharacterDateOfDeath, CharacterPet, CharacterWand, CharacterPatronus, CharacterBoggart, CharacterQuote) VALUES (@fname, @lname, @aka, @gender, @bloodstatus, @birth, @death, @pet, @wand, @patronus, @boggart, @quote);SELECT * FROM Character WHERE Character.CharacterID = SCOPE_IDENTITY()');
                if (!insertCharacter.recordset[0]) throw { code: 500, message: 'Internal server error. Please try again later.' }
    
                const newCharacter = {
                    id: insertCharacter.recordset[0].CharacterID,
                    fname: insertCharacter.recordset[0].CharacterFirstName,
                    lname: insertCharacter.recordset[0].CharacterLastName,
                    aka: insertCharacter.recordset[0].CharacterAlsoKnownAs,
                    gender: insertCharacter.recordset[0].CharacterGender,
                    bloodstatus: insertCharacter.recordset[0].CharacterBloodstatus,
                    birth: insertCharacter.recordset[0].CharacterDateOfBirth,
                    death: insertCharacter.recordset[0].CharacterDateOfDeath,
                    pet: insertCharacter.recordset[0].CharacterPet,
                    wand: insertCharacter.recordset[0].CharacterWand,
                    patronus: insertCharacter.recordset[0].CharacterPatronus,
                    boggart: insertCharacter.recordset[0].CharacterBoggart,
                    quote: insertCharacter.recordset[0].CharacterQuote
    
                }
                const { error } = await Character.validate(newCharacter);
                if (error) throw { code: 500, message: 'Internal server error. Character from DB is invalid.' }
    
                resolve(new Character(newCharacter));
    
            } catch (err) {
                if (DEBUG) console.log('models/character: create ... error: ${err}');
                let errorObj = { code: err.code, message: err.message };
                const { error } = Joi.validate(err, { code: Joi.number().integer().min(400).max(600).required(), message: Joi.any() });
                if (error) {
                    errorObj.code = 500;
                    errorObj.message = `Server error: ${err.message}`;
                }
    
                reject(errorObj);
            }
            sql.close();
        });
    }
}


module.exports = Character;