var express = require('express');
var router = express.Router();
const newsModule = require('../modules/news/newsController');


/* GET home page. */
router.post('/crawl-data-news', newsModule.getCrawlNews);


// router.get('/logout',  accountModule.logout);

module.exports = router;
