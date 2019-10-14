const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const Joi = require('@hapi/joi');

class Movie {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.release = obj.release;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            name: Joi.string().min(3).max(50).required(),
            release: Joi.string().min(3).max(50),
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

                const foundMovies = await pool.request()
                    .query('SELECT * FROM Movie');

                let movies = [];
                for (let i = 0; i < foundMovies.recordset.length; i++) {
                    const movie = {
                        id: foundMovies.recordset[i].MovieID,
                        name: foundMovies.recordset[i].MovieName,
                        release: foundMovies.recordset[i].MovieReleaseDate
                        
                    }

                    const { error } = Movie.validate(movie);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Movie ${ movie.name } does not validate from DB'

                    }

                    movies.push(new Movie(movie));
                }

                resolve(movies);

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

module.exports = Movie;