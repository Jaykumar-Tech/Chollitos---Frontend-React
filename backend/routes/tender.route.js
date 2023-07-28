const express = require('express'); 
const router = express.Router(); 
 
const TenderController = require('../controllers/tender.controller'); 
const ErrorHandler = require('../middleware/error.middleware'); 
const AuthGuard = require('../middleware/auth.middleware'); 
const schema = require('../validations/tender.validation'); 
const validate = require('../utils/validator.util');  
 
router.post('/add',                                 ErrorHandler(TenderController.addTender)); 
router.get('/get/:tenderId',                       ErrorHandler(TenderController.getTender)); 
router.get('/getall',                               ErrorHandler(TenderController.getAllTenders)); 
router.post('/delete/:tenderId',                     ErrorHandler(TenderController.deleteTender)); 
router.post('/update/:tenderId',                     ErrorHandler(TenderController.updateTender)); 
router.post('/addVote/:tenderId',                   ErrorHandler(TenderController.addVote)); 
 
router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'})) 
 
module.exports = router;