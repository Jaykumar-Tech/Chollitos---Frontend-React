const AuthService = require('../services/auth.service');
const jwtConfig = require('../config/jwt.config');
const mailConfig = require("../config/server.mail");
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const nodemailer = require("nodemailer");

var otps = [] ;

exports.otpGen = async (req, res) => {
    var recvEmail = req.body.email ;
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
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if (isExist) {
        return res.status(400).json({
            message: 'Email already exists.'
        });
    }
    if ( !otps.find((val)=>{
        return val.email == req.body.email && val.password == req.body.password;
    }) ) {
        return res.status(400).json({
            message: 'Email or password is not valid'
        });
    }
    // const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role, // "customer, business, admin"
        status: true
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

exports.login = async (req, res) => {
    const user = await AuthService.findUserByEmail(req.body.email);
    if (user) {
        // const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        const isMatched = req.body.password == user.password;
        if (isMatched) {
            const token = await jwtUtil.createToken({ id: user.id });
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

exports.getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);
    return res.json({
        data: user,
        message: 'Success.'
    });
}

exports.logout = async (req, res) => {
    await AuthService.logoutUser(req.token, req.user.exp);
    return res.json({ message: 'Logged out successfully.' });
}

exports.getAllUsers = async (req, res) => {
    const users = await AuthService.getAllUsers();
    return res.json({
        data: users,
        message: "Success"
    })
}

exports.deleteUser = async (req, res) => {
    const userID = req.params.userId;
    await AuthService.deleteUser(userID);
    return res.json({
        message: "Success"
    })
}

exports.verifyPassword = async ( req, res ) => {
    const user = await AuthService.findUserByEmail(req.body.email) ;
    if ( user ) {
        const isMatched = req.body.password == user.password ;
        if ( isMatched ) {
            return res.json({
                message: "success"
            })
        }
    }
    return res.status(400).json({
        message: "Unauthorized."
    })
}

exports.edit = async ( req, res)=> {
    const user = await AuthService.findUserById(req.user.id);
    if (user) {
        const isMatched = req.body.oldPassword == user.password;
        if (isMatched) {
            const userData = {
                name: req.body.name,
                email: user.email,
                password: req.body.newPassword,
                role: user.role, // "customer, business, admin"
                status: true
            }
            const userUpdated = await AuthService.updateUser(userData, user.id);
            return res.json({
                message: 'User updated successfully.'
            });
        }
    }
    return res.status(400).json({ message: 'User Failed Updating' });
}