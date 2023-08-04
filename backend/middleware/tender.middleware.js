const TenderModel = require("../models/tender.model")

exports.exist = async( req, res, next) => {
    try {
        await TenderModel.findById(req.params.tenderId);
        next()
        // Continue with your synchronous code here
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }
}