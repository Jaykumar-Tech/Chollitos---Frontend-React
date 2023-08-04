const express = require('express');
const router = express.Router();

const FollowController = require('../controllers/following.controller');
const ErrorHandler = require('../middleware/error.middleware');
const schema = require('../validations/follow.validation');
const validate = require('../utils/validator.util'); 

router.post('/request',  validate(schema.request),            ErrorHandler(FollowController.request));
router.post('/accept',  validate(schema.accept),            ErrorHandler(FollowController.accept));
router.post('/reject',  validate(schema.reject),            ErrorHandler(FollowController.reject));
router.get('/getforsender/:sender',              ErrorHandler(FollowController.getFollowForSender));
router.get('/getforreceiver/:receiver',              ErrorHandler(FollowController.getFollowForReceiver));
router.get('/getall',              ErrorHandler(FollowController.getAll));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;