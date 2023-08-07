const express = require('express');
const router = express.Router();
const multer = require("multer")
const TenderController = require('../controllers/tender.controller');
const ErrorHandler = require('../middleware/error.middleware');
const TenderMiddleware = require('../middleware/tender.middleware');
const schema = require('../validations/tender.validation');
const validate = require('../utils/validator.util');
const fs = require("fs")

var uploadPath = `${__dirname}/../uploads`;
if (!fs.existsSync(uploadPath))
    fs.mkdirSync(uploadPath)
const upload = multer({ dest: uploadPath }); // Specify the destination folder for file uploads

router.post('/create',
    upload.fields([{ name: "primary_files" }, { name: "secondary_files" }]),
    validate(schema.create),
    ErrorHandler(TenderController.create));
router.get('/get/:tenderId', TenderMiddleware.exist, ErrorHandler(TenderController.get));
router.get('/getall', ErrorHandler(TenderController.getAll));
router.get('/remove/:tenderId', TenderMiddleware.exist, ErrorHandler(TenderController.remove));
router.get('/addvote/:tenderId', TenderMiddleware.exist, ErrorHandler(TenderController.addVote));
router.get('/addview/:tenderId', TenderMiddleware.exist, ErrorHandler(TenderController.addView));
router.post('/filter', validate(schema.filter), ErrorHandler(TenderController.filter));


router.all('*', (req, res) => res.status(400).json({ message: 'Bad Request.' }))

module.exports = router;