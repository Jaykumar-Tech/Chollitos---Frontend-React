ActivityModel = require("../models/activity.model");

exports.create = async (req, res) => {
    try {
        var result = await ActivityModel.create(req.body) ;
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

exports.get = async (req, res) => {
    try {
        var result = await ActivityModel.get(req.params.user_id) ;
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

exports.getPoint = async (req, res) => {
    try {
        var result = await ActivityModel.getPoint(req.params.user_id) ;
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

exports.getAllName = async (req, res) => {
    try {
        var result = await ActivityModel.getAll() ;
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

exports.addName = async (req, res) => {
    try {
        var result = await ActivityModel.addName(req.body) ;
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

exports.deleteName = async (req, res) => {
    try {
        var result = await ActivityModel.deleteName(req.params.id) ;
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