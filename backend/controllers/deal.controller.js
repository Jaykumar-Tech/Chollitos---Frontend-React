DealModel = require("../models/deal.model");

exports.create = async (req, res) => {
    try {
        var result = await DealModel.create(req.body);
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

exports.edit = async (req, res) => {
    try {
        var result = await DealModel.edit(req.body.id, req.body);
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

exports.count = async (req, res) => {
    try {
        var result = await DealModel.count(req.body);
        return res.json({
            message: "success",
            data: result[0].cnt_deal
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
}

exports.find = async (req, res) => {
    try {
        var result = await DealModel.find(req.body);
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

exports.get = async (req, res) => {
    try {
        var result = await DealModel.get(req.params.id);
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