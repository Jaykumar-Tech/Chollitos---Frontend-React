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

module.exports = {
    register: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),//.min(8).max(16).external(validatePassword)
        role: Joi.string().required().external(validateRole)
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    otpGen: Joi.object().keys({
        email: Joi.string().email().required()
    }),
}