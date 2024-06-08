import nedb from 'nedb-promises';
import Joi from 'joi';

export const discountSchema = Joi.object({
    _id: Joi.string().max(30),
    title: Joi.string().min(4).required(),
    desc: Joi.string().min(10).required(),
    discount: Joi.number().positive().required(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            amount: Joi.number().required()
        }),
    ).required(),
    expiresAt: Joi.date().required(),
});


export const discountDb = nedb.create({
    filename: 'config/discounts.db',
    autoload: true
});