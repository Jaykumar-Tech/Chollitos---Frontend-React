const Joi = require('joi');

function validateType (value) {
    if ( ["price", "discount_percent", "discount_fixed", "free"].indexOf(value) ==-1 ) {
        throw new Error("Type must be one of price, discount_percent, discount_fixed and free");
    } 
}

function validateFeature (value) {
    if ( ["new", "highlight", "popular", "commented"].indexOf(value) == -1 ) {
        throw new Error("Feature must be one of new, highlight, popular, commented!")
    }
}

module.exports = {
    add: Joi.object().keys({
        user_id: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number(),
        retail_price: Joi.number(),
        type: Joi.string().required().external(validateType),
        discount: Joi.number(),
        store_id: Joi.number().required(),
        deal_url: Joi.string().required(),
        image_url: Joi.string().required(),
        category_id: Joi.number().required(),
        expires: Joi.date().required(),
    }),
    edit: Joi.object().keys({
        id: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number(),
        retail_price: Joi.number(),
        type: Joi.string().required().external(validateType),
        discount: Joi.number(),
        store_id: Joi.number().required(),
        deal_url: Joi.string().required(),
        image_url: Joi.string().required(),
        category_id: Joi.number().required(),
        expires: Joi.date().required(),
    }),
    find: Joi.object().keys({
        free: Joi.number().required(),
        store_id: Joi.number().required(),
        category_id: Joi.array().required(),
        feature: Joi.string().required().external(validateFeature),
        start_at: Joi.number().required(),
        length: Joi.number().required()
    }),
    count: Joi.object().keys({
        free: Joi.number().required(),
        store_id: Joi.number().required(),
        category_id: Joi.array().required(),
        feature: Joi.string().required().external(validateFeature),
    })
}