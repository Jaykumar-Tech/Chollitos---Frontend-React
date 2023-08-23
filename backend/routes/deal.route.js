const express = require('express');
const router = express.Router();

const DealController = require('../controllers/deal.controller');
const ErrorHandler = require('../middleware/error.middleware');
const Exist = require("../middleware/existance.middleware")
const schema = require('../validations/deal.validation');
const validate = require('../utils/validator.util'); 
const correctMiddle = require("../middleware/deal.middleware");

router.post('/add',       validate(schema.add),      ErrorHandler(DealController.create));
router.post('/edit',      validate(schema.edit),       ErrorHandler(DealController.edit));
router.post('/find',    correctMiddle,  validate(schema.find),     ErrorHandler(DealController.find));
router.post('/count',    correctMiddle,   validate(schema.count),     ErrorHandler(DealController.count));
router.get('/get/:id',     validate(schema.get),      ErrorHandler(DealController.get));
router.get('/getcode/:id',           ErrorHandler(DealController.getCode));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;