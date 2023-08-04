const InviteModel = require("../models/invitation.model");

exports.request = async (req, res) => {
    InviteModel.request(req.body.sender, req.body.receiver,
        (err, response) => {
            if (err) {
                if (err.exist) {
                    return res.status(400).send({
                        error: err,
                        message: "Your invitation already exist"
                    });
                }
                return res.status(400).send({
                    error: err,
                    message: "Your invitation is invalid"
                });
            }
            return res.json({
                message: "Your invitation is sent successfully",
                data: response.data
            });
        });
};

exports.accept = async (req, res) => {
    InviteModel.accept(req.body.sender, req.body.receiver,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "The invitation is invalid"
                });
            }
            return res.json({
                message: "The invitation is accepted successfully",
                data: response.data
            });
        });
};

exports.reject = async (req, res) => {
    InviteModel.reject(req.body.sender, req.body.receiver,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "The invitation doesn't exist"
                });
            }
            return res.json({
                message: "The invitation is rejected successfully",
                data: response.data
            });
        });
};

exports.getInvitationsForSender = async (req, res) => {
    InviteModel.getInvitationsForSender(req.params.sender,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "Failed to fetch invitations"
                });
            }
            return res.json({
                message: "Success",
                data: response.data
            });
        });
};

exports.getInvitationsForReceiver = async (req, res) => {
    InviteModel.getInvitationsForReceiver(req.params.receiver,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    error: err,
                    message: "Failed to fetch invitations"
                });
            }
            return res.json({
                message: "Success",
                data: response.data
            });
        });
};

exports.getAll = async (req, res) => {
    InviteModel.getAll((err, response) => {
        if (err) {
            return res.status(400).send({
                error: err,
                message: "Failed to fetch invitations"
            });
        }
        return res.json({
            message: "Success",
            data: response.data
        });
    });
};