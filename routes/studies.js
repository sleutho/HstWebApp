var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('studies', {
        title: 'Studies'
    });
});

module.exports = router;
