const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const Joi = require('@hapi/joi');

class House {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.founder = obj.founder;
        this.animal = obj.animal;
        this.colours = obj.colours;
        this.traits = obj.traits;
        this.head = obj.head;
        this.ghost = obj.ghost;
        this.room = obj.room;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            name: Joi.string().min(3).max(50).required(),
            founder: Joi.string().min(3).max(255),
            animal: Joi.string().min(3).max(50),
            colours: Joi.string().min(3).max(255),
            traits: Joi.string().min(3).max(255),
            head: Joi.string().min(3).max(255),
            ghost: Joi.string().min(3).max(255),
            room: Joi.string().min(3).max(255),
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

                const foundHouses = await pool.request()
                    .query('SELECT * FROM House');

                let houses = [];
                for (let i = 0; i < foundHouses.recordset.length; i++) {
                    const house = {
                        id: foundHouses.recordset[i].HouseID,
                        name: foundHouses.recordset[i].HouseName,
                        founder: foundHouses.recordset[i].HouseFounder,
                        animal: foundHouses.recordset[i].HouseAnimal,
                        colours: foundHouses.recordset[i].HouseColours,
                        traits: foundHouses.recordset[i].HousePersonalTraits,
                        head: foundHouses.recordset[i].HouseHead,
                        ghost: foundHouses.recordset[i].HouseGhost,
                        room: foundHouses.recordset[i].HouseCommonRoom
                    }

                    const { error } = House.validate(house);
                    if (error) throw {
                        code: 500, message: 'Internal server error.House ${ house.name } does not validate from DB'

                    }

                    houses.push(new House(house));
                }

                resolve(houses);

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
                const foundHouse = await pool.request()
                    .input('id', sql.Int, id)
                    .query('SELECT * FROM House WHERE HouseID = @id');

                    if (!foundHouse.recordset[0]) throw { code: 404, message: 'House not found' }
                    const house = {
                        id: foundHouse.recordset[0].HouseID,
                        name: foundHouse.recordset[0].HouseName,
                        founder: foundHouse.recordset[0].HouseFounder,
                        animal: foundHouse.recordset[0].HouseAnimal,
                        colours: foundHouse.recordset[0].HouseColours,
                        traits: foundHouse.recordset[0].HousePersonalTraits,
                        head: foundHouse.recordset[0].HouseHead,
                        ghost: foundHouse.recordset[0].HouseGhost,
                        room: foundHouse.recordset[0].HouseCommonRoom
                    }

                    const { error } = House.validate(house);
                    if (error) throw {
                        code: 500, message: 'Internal server error.House ${ house.name } does not validate from DB'

                    }

                    resolve(new House(house));


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

module.exports = House;