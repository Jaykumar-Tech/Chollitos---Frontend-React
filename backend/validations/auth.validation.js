const Joi = require('joi');
const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {
    if (!passwordRegex.test(String(value))) {
        throw new Error('Password should contains a lowercase, a uppercase character and a digit.')
    }
}

const validateRole = (value) => {
    if (value !== "customer" && value != "business") {
        throw new Error('Your role must be [customer, business]')
    }
}

const validateStar = (value) => {
    if ([1, 2, 3, 4, 5].indexOf(value) === -1) {
        throw new Error('Review Star Number should be one of 1,2,3,4,5')
    }
}

const validateBalance = (value) => {
    if (!Number.isInteger(value)) {
        throw new Error('Balance must be integer')
    }
}

const validateCode = (value) => {
    if (typeof value !== "string") {
        throw new Error('Code must be string')
    }
    if (value.length !== 4) {
        throw new Error('Code length must be 4')
    }
    let num = parseInt(value);

    if (isNaN(num)) {
        throw new Error('Code must be string of number')
    } 
}

function validateLoginType (value) {
    if ( value === "normal" || value === "google" || value === "facebook" ) ;
    else throw new Error('Type must be normal or google or facebook')
}

module.exports = {
    register: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(16).external(validatePassword),
        role: Joi.string().required().external(validateRole),
        type: Joi.string().required().external(validateLoginType)
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    verify: Joi.object().keys({
        email: Joi.string().email().required(),
        code: Joi.string().required().external(validateCode)
    }),
    resend: Joi.object().keys({
        email: Joi.string().email().required()
    }),
    edit: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string().required().min(8).max(16).external(validatePassword),
        newPassword: Joi.string().required().min(8).max(16).external(validatePassword),
        role: Joi.string().required().external(validateRole)
    }),
    addreview: Joi.object().keys({
        email: Joi.string().email().required(),
        star: Joi.number().required().external(validateStar)
    }),
    incbalance: Joi.object().keys({
        email: Joi.string().email().required(),
        balance: Joi.number().required().external(validateBalance)
    }),
    decbalance: Joi.object().keys({
        email: Joi.string().email().required(),
        balance: Joi.number().required().external(validateBalance)
    }),
    resetpassword: Joi.object().keys({
        email: Joi.string().email().required(),
        code: Joi.string().required().external(validateCode),
        password: Joi.string().required().min(8).max(16).external(validatePassword),
    }),
}