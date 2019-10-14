const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const Joi = require('@hapi/joi');
const _ = require('lodash');

class MagicalObject {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.type = obj.type;
        this.purpose = obj.purpose;
        this.description = obj.description;
        this.destruction = obj.destruction;
        this.movie = obj.movie;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            name: Joi.string().min(3).max(255).required(),
            type: Joi.string().min(3).max(50).required(),
            purpose: Joi.string().min(3).max(255),
            description: Joi.string().min(3),
            destruction: Joi.string().min(3).max(50),
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

                const foundMagicalObjects = await pool.request()
                    .query('SELECT MagicalObject.MagicalObjectID, MagicalObject.MagicalObjectName, MagicalObject.MagicalObjectType, MagicalObject.MagicalObjectPurpose, MagicalObject.MagicalObjectDescription, MagicalObject.MagicalObjectDateOfDestruction, Movie.MovieName FROM MagicalObject JOIN MagicalObject_In_Movie ON MagicalObject.MagicalObjectID = MagicalObject_In_Movie.FK_MagicalObjectID JOIN Movie ON MagicalObject_In_Movie.FK_MovieID = Movie.MovieID ORDER BY MagicalObject.MagicalObjectID');

                let magicalobjects = [];
                for (let i = 0; i < foundMagicalObjects.recordset.length; i++) {
                    const magicalobject = {
                        id: foundMagicalObjects.recordset[i].MagicalObjectID,
                        name: foundMagicalObjects.recordset[i].MagicalObjectName,
                        type: foundMagicalObjects.recordset[i].MagicalObjectType,
                        purpose: foundMagicalObjects.recordset[i].MagicalObjectPurpose,
                        description: foundMagicalObjects.recordset[i].MagicalObjectDescription,
                        movie: foundMagicalObjects.recordset[i].MovieName

                    }
                    if (foundMagicalObjects.recordset[i].MagicalObjectDateOfDestruction) magicalobject.destruction = foundMagicalObjects.recordset[i].MagicalObjectDateOfDestruction;

                    const { error } = MagicalObject.validate(magicalobject);
                    if (error) throw {
                        code: 500, message: 'Internal server error.MagicalObject ${ magicalobject.name } does not validate from DB'
                    }

                    magicalobjects.push(new MagicalObject(magicalobject));
                }

                const newmagicalobjects = [];
                const firstItem = _.omit(magicalobjects[0], ['movie']);
                firstItem.movies = new Array();
                firstItem.movies.push(magicalobjects[0].movie);
                newmagicalobjects.push(firstItem);
                for (let i = 1; i < magicalobjects.length; i++) {
                    const lastIndex = newmagicalobjects.length - 1;
                    if (newmagicalobjects[lastIndex].id !== magicalobjects[i].id) {

                        const item = _.omit(magicalobjects[i], ['movie']);
                        item.movies = new Array();
                        item.movies.push(magicalobjects[i].movie);

                        newmagicalobjects.push(item);
                    }
                    else {
                        newmagicalobjects[lastIndex].movies.push(magicalobjects[i].movie);
                    }
                }
                resolve(newmagicalobjects);

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
                const foundMagicalObjects = await pool.request()
                    .input('id', sql.Int, id)
                    .query('SELECT MagicalObject.MagicalObjectID, MagicalObject.MagicalObjectName, MagicalObject.MagicalObjectType, MagicalObject.MagicalObjectPurpose, MagicalObject.MagicalObjectDescription, MagicalObject.MagicalObjectDateofDestruction, Movie.MovieName FROM MagicalObject JOIN MagicalObject_In_Movie ON MagicalObject.MagicalObjectID = MagicalObject_In_Movie.FK_MagicalObjectID JOIN Movie ON MagicalObject_In_Movie.FK_MovieID = Movie.MovieID WHERE MagicalObjectID=@id');

                let magicalobjects = [];
                for (let i = 0; i < foundMagicalObjects.recordset.length; i++) {

                    const magicalobject = {
                        id: foundMagicalObjects.recordset[i].MagicalObjectID,
                        name: foundMagicalObjects.recordset[i].MagicalObjectName,
                        type: foundMagicalObjects.recordset[i].MagicalObjectType,
                        purpose: foundMagicalObjects.recordset[i].MagicalObjectPurpose,
                        description: foundMagicalObjects.recordset[i].MagicalObjectDescription,
                        movie: foundMagicalObjects.recordset[i].MovieName
                    }
                    if (foundMagicalObjects.recordset[i].MagicalObjectDateOfDestruction) magicalobject.destruction = foundMagicalObjects.recordset[i].MagicalObjectDateOfDestruction;

                    const { error } = MagicalObject.validate(magicalobject);
                    if (error) throw {
                        code: 500, message: 'Internal server error.MagicalObject ${ magicalobject.name } does not validate from DB'
                    }

                    magicalobjects.push(new MagicalObject(magicalobject));
                }

                const newmagicalobjects = [];
                const firstItem = _.omit(magicalobjects[0], ['movie']);
                firstItem.movies = new Array();
                firstItem.movies.push(magicalobjects[0].movie);
                newmagicalobjects.push(firstItem);
                for (let i = 1; i < magicalobjects.length; i++) {
                    const lastIndex = newmagicalobjects.length - 1;
                    if (newmagicalobjects[lastIndex].id !== magicalobjects[i].id) {

                        const item = _.omit(magicalobjects[i], ['movie']);
                        item.movies = new Array();
                        item.movies.push(magicalobjects[i].movie);

                        newmagicalobjects.push(item);

                    }
                    else {
                        newmagicalobjects[lastIndex].movies.push(magicalobjects[i].movie);
                    }
                }
                resolve(newmagicalobjects);



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

module.exports = MagicalObject;