const Joi = require('joi');
const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {  
    if(!passwordRegex.test(String(value))) { 
        throw new Error('Password should contains a lowercase, a uppercase character and a digit.')
    }
}

const validateRole = (value) => {
    if ( value !== "customer" && value != "business" ) {
        throw new Error('You are not valid role')
    }
}

const validateStar = (value) => {
    if ( [1,2,3,4,5].indexOf(value) === -1 ) {
        throw new Error('Review Star Number should be one of 1,2,3,4,5')
    }
}

const validateBalance = (value) => {
    if ( !Number.isInteger(value) ) {
        throw new Error('Value must be integer')
    }
}

module.exports = {
    register: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(16).external(validatePassword),
        role: Joi.string().required().external(validateRole)
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    otpGen: Joi.object().keys({
        email: Joi.string().email().required()
    }),
    edit: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string().required(),//.min(8).max(16).external(validatePassword)
        newPassword: Joi.string().required(),//.min(8).max(16).external(validatePassword)
        role: Joi.string().required().external(validateRole)
    }),
    addreview: Joi.object().keys({
        email: Joi.string().email().required(),
        star: Joi.number().required().external(validateStar)
    }),
    incbalance: Joi.object().keys({
        email: Joi.string().email().required(),
        value: Joi.number().required().external(validateBalance)
    }),
    decbalance: Joi.object().keys({
        email: Joi.string().email().required(),
        value: Joi.number().required().external(validateBalance)
    })
}