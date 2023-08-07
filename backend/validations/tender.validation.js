const Joi = require('joi');

const validateRole = (value) => {
    if (value !== "customer" && value != "business") {
        throw new Error('You are not valid role')
    }
}

module.exports = {
    create: Joi.object().keys({
        seller_id: Joi.number().required(),
        subject: Joi.string().required(),
        ctd_id: Joi.string().required(),
        type: Joi.string().required(),
        lots: Joi.string().required(),
        funding: Joi.string().required(),
        language: Joi.string().required(),
        deadline: Joi.date().required()
    }),
    filter: Joi.object().keys({
        filter: Joi.object().required(),
        orderBy: Joi.string().required(),
        offset: Joi.number().required(),
        count: Joi.number().required()
    }),
    download: (req, res, next) => {
        try {
            var downloadId = req.params.downloadId;
            var splited = downloadId.trim().split("-");
            console.log(splited)
            if (splited.length == 3) {
                for ( var i = 0 ; i < 3 ; i ++ ) {
                    if ( parseInt(splited[i]) === NaN ) {
                        throw new Error("There is no file");
                    }
                }
                if ( parseInt(splited[1]) !== 1 && parseInt(splited[1]) !== 0 ) {
                    throw new Error("Second Number should be 1 or 0");
                }
                next() ;
            } else {
                throw new Error("Invalid URL");
            }
        } catch (error) {
            return res.status(400).send({
                message: "error",
                data: error.message
            })
        }
    }
}