var express = require('express');
var router = express.Router();
const user = require('../controllers/userControllers')
/* GET users listing. */
router.post('/sendCode', user.sendCode);
router.post('/codePhoneLogin', user.codePhoneLogin);

module.exports = router;
