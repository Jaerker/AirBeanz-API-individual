import nedb from 'nedb-promises';
import Joi from 'joi'


const userSchema = Joi.object({
    firstName: Joi.string().min(4).max(10).required(),
    lastName: Joi.string().min(4).max(10).required(),
    address: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(4).max(15).alphanum().required(),
    password: Joi.string().min(4).max(30).pattern(/^[a-zåäöA-ZÅÄÖ0-9 ]+$/).required(),
    validatePassword: Joi.any().valid(Joi.ref('password')).required()
});


const loginSchema = Joi.object({
    username: Joi.string().min(4).max(15).alphanum().required(),
    password: Joi.string().min(4).max(30).pattern(/^[a-zåäöA-ZÅÄÖ0-9 ]+$/).required()
});

export { userSchema, loginSchema };
export const userDb = nedb.create({
    filename: 'config/users.db',
    autoload: true
});