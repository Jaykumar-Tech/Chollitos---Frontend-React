const Joi = require('joi');

const validateRole = (value) => {
    if ( value !== "customer" && value != "business" ) {
        throw new Error('You are not valid role')
    }
}

module.exports = {
    create: Joi.object().keys({
        seller_id: Joi.number().required(),
        subject: Joi.string().required(),
        ctd_id: Joi.string().required(),
        type: Joi.string().required(),
        lots: Joi.array().required(),
        funding: Joi.string().required(),
        language: Joi.string().required(),
        deadline: Joi.date().required(),
        primary_files: Joi.array().required(),
        secondary_files: Joi.array().required()
    }),
    filter: Joi.object().keys({
        filter: Joi.object().required(),
        orderBy: Joi.string().required(),
        offset: Joi.number().required(),
        count: Joi.number().required()
    })
}