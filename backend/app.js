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

const userRoute = require('./routes/user.route');
const databaseRoute = require("./routes/database.route");

app.use('/api/user', userRoute);
app.use("/api/database", databaseRoute);

module.exports = app;
