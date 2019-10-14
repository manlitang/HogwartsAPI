const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const Joi = require('@hapi/joi');
const _ = require('lodash');

class Spell {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.purpose = obj.purpose;
        this.movie = obj.movie;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            name: Joi.string().min(3).max(255).required(),
            purpose: Joi.string().min(3).max(255),
            movie: Joi.string().min(3).max(255).required(),
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

                const foundSpells = await pool.request()
                    .query('SELECT Spell.SpellID, Spell.SpellName, Spell.SpellPurpose, Movie.MovieName FROM Spell JOIN Spell_In_Movie ON Spell.SpellID = Spell_In_Movie.FK_SpellID JOIN Movie ON Spell_In_Movie.FK_MovieID = Movie.MovieID ORDER BY Spell.SpellID');

                let spells = []; 
                for (let i = 0; i < foundSpells.recordset.length; i++) { 
                   
                    const spell = { 
                        id: foundSpells.recordset[i].SpellID,
                        name: foundSpells.recordset[i].SpellName,
                        purpose: foundSpells.recordset[i].SpellPurpose,
                        movie: foundSpells.recordset[i].MovieName
                    }
        
                    const { error } = Spell.validate(spell);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Spell ${ spell.name } does not validate from DB'
                    }

                    spells.push(new Spell(spell));
                }
                

                const newspells = []; 
                const firstItem = _.omit(spells[0], ['movie']);
                firstItem.movies = new Array();
                firstItem.movies.push(spells[0].movie);
                newspells.push(firstItem);
                for (let i = 1; i < spells.length; i++) {
                    const lastIndex = newspells.length - 1;
                    if (newspells[lastIndex].id !== spells[i].id) {

                        const item = _.omit(spells[i], ['movie']);
                        item.movies = new Array();
                        item.movies.push(spells[i].movie);

                        newspells.push(item);

                    }
                    else {
                        newspells[lastIndex].movies.push(spells[i].movie);
                    }
                }
                resolve(newspells);

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
                const foundSpells = await pool.request()
                    .input('id', sql.Int, id)
                    .query('SELECT Spell.SpellID, Spell.SpellName, Spell.SpellPurpose, Movie.MovieName FROM Spell JOIN Spell_In_Movie ON Spell.SpellID = Spell_In_Movie.FK_SpellID JOIN Movie ON Spell_In_Movie.FK_MovieID = Movie.MovieID WHERE SpellID=@id');

                let spells = [];
                for (let i = 0; i < foundSpells.recordset.length; i++) {

                    const spell = {
                        id: foundSpells.recordset[i].SpellID,
                        name: foundSpells.recordset[i].SpellName,
                        purpose: foundSpells.recordset[i].SpellPurpose,
                        movie: foundSpells.recordset[i].MovieName

                    }

                    const { error } = Spell.validate(spell);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Spell ${ spell.name } does not validate from DB'
                    }

                    spells.push(new Spell(spell));
                }

                const newspells = [];
                const firstItem = _.omit(spells[0], ['movie']);
                firstItem.movies = new Array();
                firstItem.movies.push(spells[0].movie);
                newspells.push(firstItem);
                for (let i = 1; i < spells.length; i++) {
                    const lastIndex = newspells.length - 1;
                    if (newspells[lastIndex].id !== spells[i].id) {

                        const item = _.omit(spells[i], ['movie']);
                        item.movies = new Array();
                        item.movies.push(spells[i].movie);

                        newmspellss.push(item);

                    }
                    else {
                        newspells[lastIndex].movies.push(spells[i].movie);
                    }
                }
                resolve(newspells);



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
}

module.exports = Spell;