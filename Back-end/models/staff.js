const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString'); 
const Joi = require('@hapi/joi');

class CharacterStaff {
    constructor(obj) {
        this.id = obj.id;
        this.fname = obj.fname;
        this.lname = obj.lname;
        this.aka = obj.aka;
        this.title = obj.title;
        this.gender = obj.gender;
        this.bloodstatus = obj.bloodstatus;
        this.birth = obj.birth;
        this.death = obj.death;
        this.pet = obj.pet;
        this.wand = obj.wand;
        this.patronus = obj.patronus;
        this.boggart = obj.boggart;
        this.quote = obj.quote;
    }

    static validate(obj) {
        let schema = Joi.object().keys({            
            fname: Joi.string().min(3).max(50),
            lname: Joi.string().min(3).max(50),
            aka: Joi.string().min(3).max(255),
            title: Joi.string().min(3).max(255).required(),
            gender: Joi.string().min(3).max(50),
            bloodstatus: Joi.string().min(3).max(50),
            birth: Joi.date(),
            death: Joi.date(),
            pet: Joi.string().min(3).max(50),
            wand: Joi.string().min(3).max(255),
            patronus: Joi.string().min(3).max(50),
            boggart: Joi.string().min(3).max(255),
            quote: Joi.string().min(3)
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

                const foundCharactersStaff = await pool.request()
                    .query('SELECT Character.CharacterID, Character.CharacterFirstName, Character.CharacterLastName, Character_Staff.CharacterTitle FROM Character INNER JOIN Character_Staff ON Character.CharacterID = Character_Staff.FK_CharacterID');

                let charactersStaff = [];
                for (let i = 0; i < foundCharactersStaff.recordset.length; i++) {
                    const characterStaff = {
                        id: foundCharactersStaff.recordset[i].CharacterID,
                        fname: foundCharactersStaff.recordset[i].CharacterFirstName,
                        lname: foundCharactersStaff.recordset[i].CharacterLastName,
                        title: foundCharactersStaff.recordset[i].CharacterTitle
                    }

                    const { error } = CharacterStaff.validate(characterStaff);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Character_Staff ${ character.title } does not validate from DB'
                    }

                    charactersStaff.push(new CharacterStaff(characterStaff));
                }

                resolve(charactersStaff);

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

module.exports = CharacterStaff;