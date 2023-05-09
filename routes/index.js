var express = require('express');
var router = express.Router();
const accountModule = require('../modules/account/accountController');
const hotelModule = require('../modules/hotel/hotelController');
const contractModule = require('../modules/contract/contractController');
const paymentModule = require('../modules/payment/paymentController');

/* GET home page. */
router.post('/account/register', accountModule.Register);
router.post('/account/login', accountModule.Login);
router.post('/account/forgot-password', accountModule.ResetPassword);
router.post('/create', hotelModule.Create);
router.post('/search', hotelModule.Search);
router.get('/hotel/:id', hotelModule.GetOne);
router.get('/contract/:id', contractModule.GetOne);
router.post('/create-contract', contractModule.Create);
router.post('/create-payment', paymentModule.Create);

// router.get('/logout',  accountModule.logout);

module.exports = router;
