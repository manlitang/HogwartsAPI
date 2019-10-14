const Joi = require('@hapi/joi');
const sql = require('mssql');
const config = require('config');
const con = config.get('connectionString');
const DEBUG = config.get('DEBUG');

class User {
    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;
    }

    static validate(obj) {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(3).max(255).required()
        });
        if (obj.id) {
            schema = schema.append({
                id: Joi.number().integer().min(1).required()
            });
        } 

        return schema.validate(obj); 
    }

    static readByEmail(email) {
        return new Promise(async (resolve, reject) => {
            if (DEBUG) { console.log('model/user: readByEmail .. started') }
            try {
                const pool = await sql.connect(con);
                if (DEBUG) { console.log('model/user: readByEmail .. pool successful') }

                const foundUser = await pool.request()
                    .input('email', sql.NVarChar(255), email)
                    .query('SELECT * FROM hpUser WHERE hpUserEmail = @email');
                if (DEBUG) { console.log('model/user: readByEmail .. query successful') }

                if (!foundUser.recordset[0]) throw { code: 404, message: 'User not found' }
                if (DEBUG) { console.log('model/user: readByEmail .. User found') }

                const user = {
                    id: foundUser.recordset[0].hpUserID,
                    email: foundUser.recordset[0].hpUserEmail,
                    password: foundUser.recordset[0].hpPwHash
                }
                
                const { error } = User.validate(user);
                if (error) throw { code: 500, message: 'Internal server error. User does not validate from DB' }
                if (DEBUG) { console.log('model/user: readByEmail .. User OK') }

                resolve(new User(user));

            } catch (err) {
                if (DEBUG) { console.log(`model/user: readByEmail .. ERROR: ${err}`) }
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

module.exports = User;