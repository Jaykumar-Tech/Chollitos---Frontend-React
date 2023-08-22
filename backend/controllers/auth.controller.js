const jwtConfig = require('../config/jwt.config');
const mailConfig = require("../config/server.mail");
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const nodemailer = require("nodemailer");
const moment = require("moment")
const UserModel = require("../models/user.model");
const urlConfig = require("../config/url.config")

const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");
var serviceAccount = require("../chollo-es-service-account.json");
var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendCode = async (email, code) => {
    new Promise(async (resolve, reject) => {
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
                resolve({ message: "success", data: code })
                return;
            } catch (error) {
                console.log(error);
                reject(error)
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
            try {
                const mailOptions = {
                    from: mailConfig.mail,
                    to: email,
                    subject: 'Verification Code From Chollo.es',
                    html: `Your Verification Code is: <a href='${urlConfig.SERVER_URL}api/user/callback?code=${code}&&expires=${new Date().getTime()}&&email=${email}'>Verify Email</a>`,
                };

                const info = await transporter.sendMail(mailOptions);
                resolve({ message: "success", data: code })
                return;
            } catch (error) {
                console.log(error);
                reject(error)
                return;
            }
        }
    })
}

exports.exist = async (req, res) => {
    try {
        try {
            var user = await UserModel.findByEmail(req.body.email);
            if (user.status) {
                return res.status(400).json({
                    message: 'Email already exists.'
                });
            } else {
                await UserModel.remove(user.id, (err, response) => { });
            }
        } catch (error) { }

        const userData = {
            username: "temp",
            email: req.body.email,
            password: "temp"
        }
        await UserModel.create(userData);
        var code = bcryptUtil.genCode();

        await sendCode(req.body.email, code);
        await UserModel.saveCode(req.body.email, code);
        return res.json({
            message: "Confirm Email Verification"
        })
    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.google = async (req, res) => {
    var email = req.body.email;
    var idToken = req.body.idToken;

    defaultApp.auth().verifyIdToken(idToken)
        .then(async (decodedToken) => {
            try {
                try {
                    var user = await UserModel.findByEmail(email);
                    if (user.status) {
                        return res.status(400).json({
                            message: 'Email already exists.'
                        });
                    } else {
                        await UserModel.remove(user.id, (err, response) => { });
                    }
                } catch (error) { }
                console.log(decodedToken) ;

                const userData = {
                    username: "temp",
                    email: email,
                    password: "temp"
                }
                await UserModel.create(userData);
                return res.json({
                    message:"Valid Email"
                });
            } catch (error) {
                return res.status(400).send({
                    error: error.message
                })
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send({
                message: "Invalid Email"
            })
            // Handle error
        });
}

exports.authCallback = async (req, res) => {
    try {
        const query = req.query;
        if (query.expires) {
            if (new Date().getTime() - parseInt(query.expires) > 1000 * 60 * 5) {
                return res.status(400).send({
                    message: "Your verification is too late"
                })
            }
            await UserModel.verifyCode(query.email, query.code)
            return res.json({
                message: "Your Email is verified"
            })
        } else if (req.query.method == 'register')
            return res.redirect("/password");
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const hashedPassword = await bcryptUtil.createHash(password);
        const userData = {
            username: username,
            email: email,
            password: hashedPassword,
            role: "customer", // "customer, business, admin"
            status: true
        }
        await UserModel.removeByEmail(email, (err, response) => { });
        await UserModel.create(userData)
        return res.json({
            message: 'Success Register'
        });
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }

}

exports.facebook = async (req, res) => {

}

exports.login = async (req, res) => {
    try {
        var user = await UserModel.findByEmail(req.body.email)
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        // const isMatched = req.body.password == user.password;
        if (isMatched) {
            const token = await jwtUtil.createToken({ id: user.id, role: user.role });
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl,
                user: {
                    name: user.username,
                    role: user.role
                }
            });
        } else
            return res.status(400).json({
                message: "Unauthorized."
            })
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}