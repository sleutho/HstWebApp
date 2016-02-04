var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('studies', {
        title: 'Studies'
    });
});

router.get('/:study/studyindex', function (req, res, next) {
    res.render('studyindex', {
        title: 'Index',
        study: req.params.study
    });
});

router.get('/:study', function (req, res, next) {
    res.render('study', {
        title: 'Study',
        study: req.params.study
    });
});

router.get('/:study/variables', function (req, res, next) {
    res.render('variables', {
        title: 'Variables',
        study: req.params.study
    });
});

router.get('/:study/responses', function (req, res, next) {
    res.render('responses', {
        title: 'Responses',
        study: req.params.study
    });
});

router.get('/:study/specification', function (req, res, next) {
    res.render('specification', {
        title: 'Specification',
        study: req.params.study
    });
});

router.get('/:study/evaluate', function (req, res, next) {
    res.render('evaluate', {
        title: 'Evaluate',
        study: req.params.study
    });
});

router.get('/:study/summary', function (req, res, next) {
    res.render('summary', {
        title: 'Summary',
        study: req.params.study
    });
});

module.exports = router;
