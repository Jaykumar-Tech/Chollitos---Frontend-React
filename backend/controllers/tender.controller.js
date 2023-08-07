const TenderModel = require('../models/tender.model');
const fs = require("fs")

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
            data: error.message
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
            data: error.message
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
            data: error.message
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
            data: error.message
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
            data: error.message
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
            data: error.message
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
            data: error.message
        })
    }
}

exports.download = async (req, res) => {
    try {
        var downloadId = req.params.downloadId.split("-");
        var tenderId = parseInt(downloadId[0]);
        var isPrimary = parseInt(downloadId[1]);
        var index = parseInt(downloadId[2]);
        var result = await TenderModel.download(
            tenderId,
            isPrimary,
            index);
        var filepath = result.data;
        console.log(filepath)

        const fileStream = fs.createReadStream(filepath);
        fileStream.pipe(res);
    } catch (error) {
        return res.status(400).send({
            message: "failed",
            data: error.message
        })
    }
}