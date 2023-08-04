const Joi = require('joi');

const validateInteger = (value) => {
    if ( !Number.isInteger(value) ) {
        throw new Error('Value must be integer')
    }
}

module.exports = {
    request: Joi.object().keys({
        sender: Joi.number().required().external(validateInteger),
        receiver: Joi.number().required().external(validateInteger)
    }),
    accept: Joi.object().keys({
        sender: Joi.number().required().external(validateInteger),
        receiver: Joi.number().required().external(validateInteger)
    }),
    reject: Joi.object().keys({
        sender: Joi.number().required().external(validateInteger),
        receiver: Joi.number().required().external(validateInteger)
    })
}