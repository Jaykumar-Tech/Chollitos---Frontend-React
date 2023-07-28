const Joi = require('joi');

const validateRole = (value) => {
    if ( value !== "customer" && value != "business" ) {
        throw new Error('You are not valid role')
    }
}

module.exports = {
    register: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),//.min(8).max(16).external(validatePassword)
        role: Joi.string().required().external(validateRole)
    }),
    // login: Joi.object().keys({
    //     email: Joi.string().email().required(),
    //     password: Joi.string().required()
    // }),
    // otpGen: Joi.object().keys({
    //     email: Joi.string().email().required()
    // }),
    // edit: Joi.object().keys({
    //     name: Joi.string().required(),
    //     email: Joi.string().email().required(),
    //     oldPassword: Joi.string().required(),//.min(8).max(16).external(validatePassword)
    //     newPassword: Joi.string().required(),//.min(8).max(16).external(validatePassword)
    //     role: Joi.string().required().external(validateRole)
    // })
}