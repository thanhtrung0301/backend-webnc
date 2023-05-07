var express = require('express');
var router = express.Router();
const accountModule = require('../modules/account/accountController');
const hotelModule = require('../modules/hotel/hotelController');

/* GET home page. */
router.post('/register', accountModule.Register);
router.post('/login', accountModule.Login);
router.post('/create', hotelModule.Create);
router.post('/search', hotelModule.Search);
router.get('/hotel/:id', hotelModule.GetOne);

// router.get('/logout',  accountModule.logout);

module.exports = router;
