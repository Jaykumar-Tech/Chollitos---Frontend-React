const express = require('express');
const router = express.Router();

const DatabaseController = require('../controllers/database.controller');
const ErrorHandler = require("../middleware/error.middleware")

router.get('/create', ErrorHandler(DatabaseController.create));
router.get('/connect', ErrorHandler(DatabaseController.connect));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;