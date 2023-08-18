CategoryModel = require("../models/category.model");

exports.create = async (req, res) => {
    try {
        var result = await CategoryModel.create(req.body) ;
        return res.json({
            message: "success",
            data: result.insertId
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}

exports.getChildren = async (req, res) => {
    try {
        var result = await CategoryModel.getChildren(req.params.id) ;
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

exports.getAll = async (req, res) => {
    try {
        var result = await CategoryModel.getAll() ;
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