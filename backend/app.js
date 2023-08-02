const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const async = require("async")
require('dotenv').config();
const mysql = require('mysql');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

// const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const userRoute = require('./routes/user.route');
const databaseRoute = require("./routes/database.route");

app.use('/api/user', userRoute);
app.use("/api/database", databaseRoute);

// const oAuth2Client = new google.auth.OAuth2(
//     '1033820427359-0kpff4t1sn256rbtuu3jr2h1onoh0975.apps.googleusercontent.com',
//     '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',
//     'http://dactest.ap-south-1.elasticbeanstalk.com/token'
// );

// app.get('/google', function (req, res) {
//     var url = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/gmail.send'],
//         prompt: "consent"
//     })
//     return res.redirect(url)
// })

// app.get('/token', async (req, res) => {
//     // return res.json(req.query.code)
//     authorizationCode = req.query.code;
//     oAuth2Client.getToken(authorizationCode, (err, token) => {
//         if (err) return res.json({ error: err, message: "1" })
//         oAuth2Client.setCredentials(token);

//         try {
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     type: 'OAuth2',
//                     user: 'daltonbreka@gmail.com',
//                     clientId: '1033820427359-0kpff4t1sn256rbtuu3jr2h1onoh0975.apps.googleusercontent.com',
//                     clientSecret: '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',
//                     refreshToken: token.refresh_token,
//                     accessToken: token.access_token
//                 }
//             });
//             // Send the email with the verification code
//             const mailOptions = {
//                 from: 'daltonbreka@gmail.com',
//                 to: 'harryhorris12@gmail.com',
//                 subject: 'Verification Code',
//                 text: 'Here is your verification code: 123456' // replace with your verification code
//             };
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     return res.json({
//                         error: error, message: "2" 
//                     })
//                 } else {
//                     return res.json({
//                         error: info.response
//                     })
//                 }
//             });
//         } catch (error) {
//             return res.json({
//                 error: error, message: "3" 
//             })
//         }
        
//     });
// });

app.get("/", (req, res) => {
    return res.json({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
        // host: "localhost",
        // user: "root",
        // password: "",
        // port: 3306
    })
})

module.exports = app;
