var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('studies', {
        title: 'Studies'
    });
});

router.get('/:study', function (req, res, next) {
    res.render('study', {
        title: 'Study',
        study: req.params.study
    });
});

module.exports = router;
