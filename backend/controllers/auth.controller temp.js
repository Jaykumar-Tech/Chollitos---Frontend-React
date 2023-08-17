const jwtConfig = require('../config/jwt.config');
const mailConfig = require("../config/server.mail");
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const nodemailer = require("nodemailer");
const moment = require("moment")
const mysql = require("mysql")
const UserModel = require("../models/user.model");

const sendCode = async (email, code, callback) => {
    if (email.indexOf("@gmail.com") != -1) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            // secure: true,
            auth: {
                user: mailConfig.gmail,
                pass: mailConfig.gmail_password
            },
        });
        try {
            const mailOptions = {
                from: mailConfig.gmail,
                to: email,
                subject: 'Verification Code From Dac Rapide',
                text: `Your Verification Code is: <${code}>`,
            };

            const info = await transporter.sendMail(mailOptions);
            callback(null, { message: "success", data: code })
            return;
        } catch (error) {
            console.log(error);
            callback(error, null)
            return;
        }
    } else {
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: mailConfig.mail,
                pass: mailConfig.password
            },
        });
        console.log(`Your Verification Code is: <a href='http://localhost:4000/api/user/getcode?code=${code}&&expires=${new Date().getTime()}&&email=${email}'>Verify Email</a>`)
        try {
            const mailOptions = {
                from: mailConfig.mail,
                to: email,
                subject: 'Verification Code From Chollo.es',
                html: `Your Verification Code is: <a href='http://localhost:4000/api/user/getcode?code=${code}&&expires=${new Date().getTime()}&&email=${email}'>Verify Email</a>`,
            };

            const info = await transporter.sendMail(mailOptions);
            callback(null, { message: "success", data: code })
            return;
        } catch (error) {
            console.log(error);
            callback(error, null)
            return;
        }
    }
}

exports.register = async (req, res) => {
    UserModel.findByEmail(req.body.email,
        async (err, row) => {
            if (!err) {
                if (row.status) {
                    return res.status(400).json({
                        message: 'Email already exists.'
                    });
                } else {
                    await UserModel.remove(row.id, (err, response) => { });
                }
            }

            const hashedPassword = await bcryptUtil.createHash(req.body.password);
            const userData = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role, // "customer, business, admin"
                status: false,
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
                        var code = bcryptUtil.genCode();
                        
                        sendCode(req.body.email, code, async (err, response) => {
                            if (err) {
                                return res.status(400).json({
                                    message: "Email is Invalid"
                                })
                            }
                            UserModel.saveCode(req.body.email, code, (err, response) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: "Save Code Failed"
                                    })
                                }
                                return res.json({
                                    message: "Next To Verification Code"
                                })
                            })
                        })
                    }
                }
            )
        }
    )
}

exports.getCode = async (req, res) => {
    const query = req.query;
    if (new Date().getTime() - parseInt(query.expires) > 1000 * 60 * 5) {
        return res.status(400).send({
            message: "Your verification is too late"
        })
    }
    UserModel.verifyCode(query.email, query.code,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    message: "Failed Verification Code"
                })
            } else {
                return res.json({
                    message: "Your registration is successful"
                })
            }
        })
}

exports.login = async (req, res) => {
    UserModel.findByEmail(req.body.email,
        async (err, row) => {
            if (err || !row.status) {
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

// exports.login = async (req, res) => {
//     UserModel.findByEmail(req.body.email,
//         async (err, row) => {
//             if (err || !row.status) {
//                 return res.status(400).send({
//                     message: "Email doesn't exist"
//                 });
//             } else {
//                 const user = row;
//                 const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
//                 // const isMatched = req.body.password == user.password;
//                 if (isMatched) {
//                     const token = await jwtUtil.createToken({ id: user.id, role: user.role });
//                     return res.json({
//                         access_token: token,
//                         token_type: 'Bearer',
//                         expires_in: jwtConfig.ttl,
//                         user: {
//                             name: user.firstname + " " + user.lastname,
//                             role: user.role
//                         }
//                     });
//                 }
//                 return res.status(400).json({
//                     message: "Unauthorized."
//                 })
//             }
//         });
// }

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
    await UserModel.logoutUser(req.token, req.user.exp);
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
    UserModel.addReview(req.body.email, req.body.star, (err, user) => {
        if (err) {
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
    UserModel.incBalance(req.body.email, req.body.balance, (err, user) => {
        if (err) {
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
    UserModel.decBalance(req.body.email, req.body.balance, (err, user) => {
        if (err) {
            if (err.balance) {
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
exports.verifyCode = async (req, res) => {
    UserModel.verifyCode(req.body.email, req.body.code,
        (err, response) => {
            if (err) {
                return res.status(400).send({
                    message: "Failed Verification Code"
                })
            } else {
                return res.json({
                    message: "Your registration is successful"
                })
            }
        })
}
exports.resendCode = async (req, res) => {
    var code = bcryptUtil.genCode();
    sendCode(req.body.email, code, async (err, response) => {
        if (err) {
            return res.status(400).json({
                message: "Email is Invalid"
            })
        } else {
            UserModel.saveCode(req.body.email, code, (err, response) => {
                if (err) {
                    return res.status(400).json({
                        message: "Code Failed"
                    })
                } else {
                    return res.json({
                        message: "Resent Code is successful"
                    })
                }
            })
        }
    })
}
exports.resetPassword = async (req, res) => {
    UserModel.verifyCode(req.body.email, req.body.code,
        async (err, response) => {
            if (err) {
                return res.status(400).send({
                    message: "Verification Code doesn't match"
                })
            } else {
                const hashedPassword = await bcryptUtil.createHash(req.body.password);
                UserModel.resetPassword(req.body.email, hashedPassword, (err, response) => {
                    if (err) return res.status(400).send({
                        message: "Reset Password Failed"
                    })
                    else return res.json({
                        message: "Reset Password Success"
                    })
                })
            }
        })
}