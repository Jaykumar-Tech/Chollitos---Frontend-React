const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware'); // token check
const schema = require('../validations/auth.validation');
const validate = require('../utils/validator.util'); 

router.post('/register',  validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));
router.get('/getall',                               ErrorHandler(AuthController.getAllUsers));
router.get('/delete/:userId',                      ErrorHandler(AuthController.deleteUser));
router.get('/deleteAll',                           ErrorHandler(AuthController.deleteAll));
router.post('/otpgen',   validate(schema.otpGen),    ErrorHandler(AuthController.otpGen));
router.post('/edit',   validate(schema.edit),  AuthGuard,  ErrorHandler(AuthController.edit));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;