const FollowModel = require("../models/following.model");

exports.request = async (req, res) => {
    FollowModel.request(req.body.sender, req.body.receiver,
        (err, response) => {
            if (err) {
                if (err.exist) {
                    return res.status(400).send({
                        error: err,
                        message: "Your request already exist"
                    });
                }
                return res.status(400).send({
                    error: err,
                    message: "Your request is invalid"
                })
            }
            return res.json({
                message: "Your request is sent successfully",
                data: response.data
            })
        })
}
exports.accept = async (req, res) => {
    FollowModel.accept(req.body.sender, req.body.receiver,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "The request is invalid"
                })
            }
            return res.json({
                message: "The request is accepted successfully",
                data: response.data
            })
        })
}
exports.reject = async (req, res) => {
    FollowModel.reject(req.body.sender, req.body.receiver,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "The request doesn't exist"
                })
            }
            return res.json({
                message: "The request is rejected successfully",
                data: response.data
            })
        })
}
exports.getFollowForSender = async (req, res) => {
    FollowModel.getFollowingForSender(req.params.sender,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "Failed to fetch followings"
                })
            }
            return res.json({
                message: "Success",
                data: response.data
            })
        })
}
exports.getFollowForReceiver = async (req, res) => {
    FollowModel.getFollowingForReceiver(req.params.receiver,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "Failed to fetch followings"
                })
            }
            return res.json({
                message: "Success",
                data: response.data
            })
        })
}
exports.getAll = async (req, res) => {
    FollowModel.getAll((err, response) => {
        if (err) {
            return res.status(400).send({
                error: err,
                message: "Failed to fetch followings"
            })
        }
        return res.json({
            message: "Success",
            data: response.data
        })
    })
}