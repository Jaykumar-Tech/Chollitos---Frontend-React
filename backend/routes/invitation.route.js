const express = require('express');
const router = express.Router();

const InviteController = require('../controllers/invitation.controller');
const ErrorHandler = require('../middleware/error.middleware');
const schema = require('../validations/invitation.validation');
const validate = require('../utils/validator.util'); 

router.post('/request', validate(schema.request),   ErrorHandler(InviteController.request));
router.post('/accept', validate(schema.accept),     ErrorHandler(InviteController.accept));
router.post('/reject', validate(schema.reject),     ErrorHandler(InviteController.reject));
router.get('/getforsender/:sender',                 ErrorHandler(InviteController.getInvitationsForSender));
router.get('/getforreceiver/:receiver',             ErrorHandler(InviteController.getInvitationsForReceiver));
router.get('/getall',                               ErrorHandler(InviteController.getAll));

router.all('*', (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;