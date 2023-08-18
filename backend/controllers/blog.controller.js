BlogModel = require("../models/blog.model");

exports.create = async (req, res) => {
    try {
        await BlogModel.create(req.body.html) ;
        return res.json({
            message: "success"
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}

exports.edit = async (req, res) => {
    try {
        await BlogModel.edit(req.body.id, req.body.html) ;
        return res.json({
            message: "success"
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}

exports.get = async (req, res) => {
    try {
        var result = await BlogModel.get(req.params.id) ;
        return res.json({
            message: "success",
            data: result
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}