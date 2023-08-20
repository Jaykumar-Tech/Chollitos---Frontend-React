const express = require('express');
const multer = require("multer")
const fs = require("fs")
const router = express.Router();

const ResourceController = require('../controllers/resource.controller');
const ErrorHandler = require('../middleware/error.middleware');
// const schema = require('../validations/follow.validation');
// const validate = require('../utils/validator.util'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../resource/"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Specify the filename
    }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'),  ErrorHandler(ResourceController.upload) );
router.get('/get/:id', ErrorHandler(ResourceController.get));

router.all('*', (req, res) => res.status(400).json({ message: 'Bad Request.' }))

module.exports = router;