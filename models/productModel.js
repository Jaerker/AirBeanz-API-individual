import nedb from 'nedb-promises';
import Joi from 'joi';

export const productSchema = Joi.object({
    _id: Joi.string().max(30),
    desc: Joi.string().min(10).required(),
    title: Joi.string().min(4).max(30).required(),
    price: Joi.number().positive().required(),
    estimatedTimeInMinutes: Joi.number().positive(),
});

export const productDb = nedb.create({
    filename: 'config/products.db',
    autoload: true
});