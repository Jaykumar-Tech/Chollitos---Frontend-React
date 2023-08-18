const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const async = require("async")
const fs = require("fs")
const mysql = require('mysql');
const app = express();
const nodemailer = require('nodemailer');

require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

const userRoute = require('./routes/user.route');
const databaseRoute = require("./routes/database.route");
const followRoute = require("./routes/following.route")
const inviteRoute = require("./routes/invitation.route")
const tenderRoute = require("./routes/tender.route")
const blogRoute = require("./routes/blog.route")
const storeRoute = require("./routes/store.route")
const reviewRoute = require("./routes/review.route")
const notificationRoute = require("./routes/notification.route")
const categoryRoute = require("./routes/category.route")

app.use('/api/user', userRoute);
app.use("/api/database", databaseRoute);
app.use("/api/follow", followRoute);
app.use("/api/invite", inviteRoute);
app.use("/api/tender", tenderRoute);
app.use("/api/blog", blogRoute)
app.use("/api/store", storeRoute)
app.use("/api/review", reviewRoute)
app.use("/api/notification", notificationRoute)
app.use("/api/category", categoryRoute)

app.get("/", (req, res) => {
    return res.json({
        message: "Hello, Welcome to Dac Rapide"
    })
})

module.exports = app;
