const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review.controller');
const ErrorHandler = require('../middleware/error.middleware');
// const schema = require('../validations/follow.validation');
// const validate = require('../utils/validator.util'); 

router.post('/add',             ErrorHandler(ReviewController.create));
router.get('/get/:store_id',           ErrorHandler(ReviewController.get));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;