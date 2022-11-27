var express = require('express');
var router = express.Router();
const accountModule = require('../modules/account/accountController');
const groupModule = require('../modules/group/groupController');

/* GET home page. */
router.post('/register', accountModule.Register);
router.post('/login', accountModule.Login);
router.post('/get-groups', groupModule.ShowAll);
router.post('/create-group', groupModule.Create);
router.post('/join-group', groupModule.Join);
// router.get('/logout',  accountModule.logout);

module.exports = router;
