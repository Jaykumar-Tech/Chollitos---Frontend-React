const AuthService = require('../services/auth.service');
const jwtConfig = require('../config/jwt.config');
const mailConfig = require("../config/server.mail");
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const nodemailer = require("nodemailer");
const moment = require("moment")
const mysql = require("mysql")
const UserModel = require("../models/user.model");

var otps = [];

exports.otpGen = async (req, res) => {
    var recvEmail = req.body.email;
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: mailConfig.mail,
            pass: mailConfig.password
        },
    });
    var otpPswd = bcryptUtil.generateStrongPassword();
    try {
        const mailOptions = {
            from: mailConfig.mail,
            to: recvEmail,
            subject: 'One Time Password From Dac Rapide',
            text: `Your password is: <${otpPswd}>`,
        };

        const info = await transporter.sendMail(mailOptions);
        otps.push({
            email: recvEmail,
            password: otpPswd
        });
        return res.status(200).json({
            message: "success"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Your email is not valid"
        })
    }
}

exports.register = async (req, res) => {
    UserModel.findByEmail(req.body.email,
        async (err, row) => {
            if (!err) {
                return res.status(400).json({
                    message: 'Email already exists.'
                });
            } else {
                const hashedPassword = await bcryptUtil.createHash(req.body.password);
                const userData = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hashedPassword,
                    role: req.body.role, // "customer, business, admin"
                    status: true,
                    created_at: moment().format('YYYY-MM-DD'),
                    updated_at: moment().format('YYYY-MM-DD')
                }
                UserModel.create(userData,
                    (err, row) => {
                        if (err) {
                            return res.status(400).json({
                                error: err,
                                message: 'Failed Register'
                            });
                        } else {
                            return res.json({
                                data: row,
                                message: 'User registered successfully.'
                            });
                        }
                    }
                )
            }

        }
    )
}

exports.login = async (req, res) => {
    UserModel.findByEmail(req.body.email,
        async (err, row) => {
            if (err) {
                return res.status(400).send({
                    message: "Email doesn't exist"
                });
            } else {
                const user = row;
                const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
                // const isMatched = req.body.password == user.password;
                if (isMatched) {
                    const token = await jwtUtil.createToken({ id: user.id, role: user.role });
                    return res.json({
                        access_token: token,
                        token_type: 'Bearer',
                        expires_in: jwtConfig.ttl,
                        user: {
                            name: user.firstname + " " + user.lastname,
                            role: user.role
                        }
                    });
                }
                return res.status(400).json({
                    message: "Unauthorized."
                })
            }
        });
}

exports.getUser = async (req, res) => {
    UserModel.findById(req.user.id,
        async (err, row) => {
            if (!err) {
                return res.json({
                    data: row,
                    message: 'Success.'
                });
            } else {
                return res.status(400).send({
                    message: "Get User Failed"
                })
            }
        }
    )
}

exports.logout = async (req, res) => {
    await AuthService.logoutUser(req.token, req.user.exp);
    return res.json({ message: 'Logged out successfully.' });
}

exports.getAllUsers = async (req, res) => {
    UserModel.getAll(async (err, rows) => {
        if (!err) {
            return res.json({
                data: rows,
                message: "Success"
            })
        } else {
            return res.status(400).json({
                message: "No Users"
            })
        }
    }
    )
}

exports.deleteUser = async (req, res) => {
    UserModel.findById(req.params.userId,
        async (err, row) => {
            if (!err) {
                return res.json({
                    message: "Delete Success"
                })
            } else {
                return res.status(400).json({
                    message: "Delete Failed"
                })
            }
        }
    )
}

exports.deleteAll = async (req, res) => {
    UserModel.removeAll(async (err, row) => {
        if (!err) {
            return res.json({
                message: "Delete All Success"
            })
        } else {
            return res.status(400).json({
                message: "Delete All Failed"
            })
        }
    })
}

exports.edit = async (req, res) => {
    UserModel.findById(req.user.id,
        async (err, row) => {
            if (!err) {
                const isMatched = await bcryptUtil.compareHash(req.body.oldPassword, row.password);
                if (isMatched) {
                    const hashedPassword = await bcryptUtil.createHash(req.body.newPassword);
                    UserModel.updateById(req.user.id, {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: hashedPassword,
                        role: req.body.role,
                        status: true,
                        email: row.email
                    }, (err, rows) => {
                        if (!err) {
                            return res.json({
                                message: "User Updated Successfully"
                            })
                        } else {
                            return res.status(400).json({
                                message: "Failed to update"
                            })
                        }
                    }
                    )
                } else {
                    return res.status(400).json({ message: 'Your password is incorrect' });
                }
            } else {
                return res.status(400).send({
                    message: "Get User Failed"
                })
            }
        }
    )
}
exports.addReview = async (req, res) => {
    UserModel.addReview(req.body.email, req.body.star, (err, user)=>{
        if ( err ) {
            return res.status(400).send({
                message: "Your email doesn't exist"
            })
        }
        return res.json({
            user: user,
            message: "Adding Review success!"
        })
    })
}
exports.incBalance = async (req, res) => {
    UserModel.incBalance(req.body.email, req.body.value, (err, user)=>{
        if ( err ) {
            return res.status(400).send({
                message: "Your email doesn't exist"
            })
        }
        return res.json({
            user: user,
            message: "success!"
        })
    })
}
exports.decBalance = async (req, res) => {
    UserModel.decBalance(req.body.email, req.body.value, (err, user)=>{
        if ( err ) {
            if ( err.balance ) {
                return res.status(400).send({
                    message: "You don't have enough balance"
                })
            }
            return res.status(400).send({
                message: "Your email doesn't exist"
            })
        }
        return res.json({
            user: user,
            message: "success!"
        })
    })
}