NotificationModel = require("../models/notification.model");

exports.create = async (req, res) => {
    try {
        var result = await NotificationModel.create(req.body) ;
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

exports.setRead = async (req, res) => {
    try {
        var result = await NotificationModel.setRead(req.params.id) ;
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

exports.getUnread = async (req, res) => {
    try {
        var result = await NotificationModel.getUnread(req.params.user_id) ;
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