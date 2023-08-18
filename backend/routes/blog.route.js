const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/blog.controller');
const ErrorHandler = require('../middleware/error.middleware');
// const schema = require('../validations/follow.validation');
// const validate = require('../utils/validator.util'); 

router.post('/add',             ErrorHandler(BlogController.create));
router.post('/edit',             ErrorHandler(BlogController.edit));
router.get('/get/:id',           ErrorHandler(BlogController.get));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;