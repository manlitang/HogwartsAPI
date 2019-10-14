const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString'); 
const Joi = require('@hapi/joi');

class CharacterStudent {
    constructor(obj) {
        this.id = obj.id;        
        this.fname = obj.fname;
        this.lname = obj.lname;
        this.aka = obj.aka;
        this.house_id = obj.house_id;
        this.house = obj.house;
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
            fname: Joi.string().min(3).max(50).required(),
            lname: Joi.string().min(3).max(50).required(),
            aka: Joi.string().min(3).max(255),               
            house: Joi.string().min(3).max(50),
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
                house_id: Joi.number().integer().min(1).required(),
                id: Joi.number().integer().min(1).required()
            });
        }

        return schema.validate(obj);
    }
    

    static readAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = await sql.connect(con);

                const foundCharactersStudent = await pool.request()
                    .query('SELECT Character.CharacterID, Character.CharacterFirstName, Character.CharacterLastName, House.HouseID, House.HouseName FROM Character INNER JOIN Student_In_House ON Character.CharacterID = Student_In_House.FK_CharacterID INNER JOIN House ON Student_In_House.FK_HouseID = House.HouseID')
                    
                let charactersStudent = [];
                for (let i = 0; i < foundCharactersStudent.recordset.length; i++) {
                    const characterStudent = {
                        id: foundCharactersStudent.recordset[i].CharacterID,
                        fname: foundCharactersStudent.recordset[i].CharacterFirstName,
                        lname: foundCharactersStudent.recordset[i].CharacterLastName,
                        house_id: foundCharactersStudent.recordset[i].HouseID,
                        house: foundCharactersStudent.recordset[i].HouseName
                    }

                    const { error } = CharacterStudent.validate(characterStudent);
                    if (error) throw {
                        code: 500, message: 'Internal server error.Student_In_House ${ character.fname } does not validate from DB'
                    }

                    charactersStudent.push(new CharacterStudent(characterStudent));
                }

                resolve(charactersStudent);

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

module.exports = CharacterStudent;