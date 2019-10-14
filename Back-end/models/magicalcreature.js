const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const Joi = require('@hapi/joi');
const _ = require('lodash');

class MagicalCreature {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.appearance = obj.appearance;
        this.abilities = obj.abilities;
        this.habitat = obj.habitat;
        this.movie = obj.movie;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            name: Joi.string().min(3).max(50).required(),
            appearance: Joi.string().min(3).max(255).required(),
            abilities: Joi.string().min(3).max(255).required(),
            habitat: Joi.string().min(3).max(255).required(),
            movie: Joi.string().min(3).max(255).required()
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

                const foundMagicalCreatures = await pool.request()
                    .query('SELECT MagicalCreature.MagicalCreatureID, MagicalCreature.MagicalCreatureName, MagicalCreature.MagicalCreatureAppearance, MagicalCreature.MagicalCreatureAbilities, MagicalCreature.MagicalCreatureTypicalHabitat, Movie.MovieName FROM MagicalCreature INNER JOIN MagicalCreature_In_Movie ON MagicalCreature.MagicalCreatureID = MagicalCreature_In_Movie.FK_MagicalCreatureID INNER JOIN Movie ON MagicalCreature_In_Movie.FK_MovieID = Movie.MovieID ORDER BY MagicalCreature.MagicalCreatureID');

                    let magicalcreatures = [];
                    for (let i = 0; i < foundMagicalCreatures.recordset.length; i++) {
                        const magicalcreature = {
                            id: foundMagicalCreatures.recordset[i].MagicalCreatureID,
                            name: foundMagicalCreatures.recordset[i].MagicalCreatureName,
                            appearance: foundMagicalCreatures.recordset[i].MagicalCreatureAppearance,
                            abilities: foundMagicalCreatures.recordset[i].MagicalCreatureAbilities,
                            habitat: foundMagicalCreatures.recordset[i].MagicalCreatureTypicalHabitat,
                            movie: foundMagicalCreatures.recordset[i].MovieName
                        }
    
                        const { error } = MagicalCreature.validate(magicalcreature);
                        if (error) throw {
                            code: 500, message: 'Internal server error.MagicalCreature ${ magicalcreature.name } does not validate from DB'
                        }
    
                        magicalcreatures.push(new MagicalCreature(magicalcreature));
                    }
    
                    const newmagicalcreatures = [];
                    const firstItem = _.omit(magicalcreatures[0], ['movie']);
                    firstItem.movies = new Array();
                    firstItem.movies.push(magicalcreatures[0].movie);
                    newmagicalcreatures.push(firstItem);
                    for (let i = 1; i < magicalcreatures.length; i++) {
                        const lastIndex = newmagicalcreatures.length - 1;
                        if (newmagicalcreatures[lastIndex].id !== magicalcreatures[i].id) {
    
                            const item = _.omit(magicalcreatures[i], ['movie']);
                            item.movies = new Array();
                            item.movies.push(magicalcreatures[i].movie);
    
                            newmagicalcreatures.push(item);
                        }
                        else {
                            newmagicalcreatures[lastIndex].movies.push(magicalcreatures[i].movie);
                        }
                    }
                    resolve(newmagicalcreatures);

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
        return new Promise(async (resolve,reject) => {
            try {
                const pool = await sql.connect(con);

                const foundMagicalCreatures = await pool.request()
                    .input('id', sql.Int, id)
                    .query('SELECT MagicalCreature.MagicalCreatureID, MagicalCreature.MagicalCreatureName, MagicalCreature.MagicalCreatureAppearance, MagicalCreature.MagicalCreatureAbilities, MagicalCreature.MagicalCreatureTypicalHabitat, Movie.MovieName FROM MagicalCreature INNER JOIN MagicalCreature_In_Movie ON MagicalCreature.MagicalCreatureID = MagicalCreature_In_Movie.FK_MagicalCreatureID INNER JOIN Movie ON MagicalCreature_In_Movie.FK_MovieID = Movie.MovieID WHERE MagicalCreatureID=@id ORDER BY MagicalCreature.MagicalCreatureID');

                    let magicalcreatures = [];
                    for (let i = 0; i < foundMagicalCreatures.recordset.length; i++) {
                        const magicalcreature = {
                            id: foundMagicalCreatures.recordset[i].MagicalCreatureID,
                            name: foundMagicalCreatures.recordset[i].MagicalCreatureName,
                            appearance: foundMagicalCreatures.recordset[i].MagicalCreatureAppearance,
                            abilities: foundMagicalCreatures.recordset[i].MagicalCreatureAbilities,
                            habitat: foundMagicalCreatures.recordset[i].MagicalCreatureTypicalHabitat,
                            movie: foundMagicalCreatures.recordset[i].MovieName
                        }
    
                        const { error } = MagicalCreature.validate(magicalcreature);
                        if (error) throw {
                            code: 500, message: 'Internal server error.MagicalCreature ${ magicalcreature.name } does not validate from DB'
                        }
    
                        magicalcreatures.push(new MagicalCreature(magicalcreature));
                    }
    
                    const newmagicalcreatures = [];
                    const firstItem = _.omit(magicalcreatures[0], ['movie']);
                    firstItem.movies = new Array();
                    firstItem.movies.push(magicalcreatures[0].movie);
                    newmagicalcreatures.push(firstItem);
                    for (let i = 1; i < magicalcreatures.length; i++) {
                        const lastIndex = newmagicalcreatures.length - 1;
                        if (newmagicalcreatures[lastIndex].id !== magicalcreatures[i].id) {
    
                            const item = _.omit(magicalcreatures[i], ['movie']);
                            item.movies = new Array();
                            item.movies.push(magicalcreatures[i].movie);
    
                            newmagicalcreatures.push(item);
                        }
                        else {
                            newmagicalcreatures[lastIndex].movies.push(magicalcreatures[i].movie);
                        }
                    }
                    resolve(newmagicalcreatures);
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

module.exports = MagicalCreature;