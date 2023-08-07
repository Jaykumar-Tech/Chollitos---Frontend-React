const TenderModel = require('../models/tender.model');

exports.create = async (req, res) => {
    try {
        var result = await TenderModel.create(req.body, req.files);
        return res.json({
            message: "success",
            data: result.data
            // data: req.body,
            // files: req.files,
            // headers: req.headers
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}

exports.get = async (req, res) => {
    try {
        var result = await TenderModel.findById(req.params.tenderId);
        return res.json({
            message: "success",
            data: result.data
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        var result = await TenderModel.getAll();
        return res.json({
            message: "success",
            data: result.data
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}

exports.remove = async (req, res) => {
    try {
        var result = await TenderModel.remove(req.params.tenderId);
        return res.json({
            message: "success",
            data: result.data
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}

exports.addVote = async (req, res) => {
    try {
        var result = await TenderModel.addVote(req.params.tenderId);
        return res.json({
            message: "success",
            data: result.data
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}

exports.addView = async (req, res) => {
    try {
        var result = await TenderModel.addView(req.params.tenderId);
        return res.json({
            message: "success",
            data: result.data
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}

exports.filter = async (req, res) => {
    try {
        var result = await TenderModel.filter(req.body.filter,
            req.body.orderBy,
            req.body.offset,
            req.body.count);
        return res.json({
            message: "success",
            data: result.data
        })
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error
        })
    }
}
