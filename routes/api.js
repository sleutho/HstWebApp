var express = require('express');
var studylist = require('../study/studylist')
var exec = require('../study/exec');

var router = express.Router();

router.get('/studies', function (req, res, next) {
    studylist.getStudyList(function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.get('/studies/:study', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--get', 'study']);
});

router.post('/studies', function (req, res, next) {
    studylist.createStudy(function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.put('/studies/:study', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--change', 'study', req.param('attr'), req.param('value')]);
    //cmd.eval(req.params.study, ['--change', 'study', req.params.attr, req.params.value]);
});

router.delete('/studies/:study', function (req, res, next) {
    studylist.deleteStudy(req.params.study, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});


router.get('/studies/:study/variables', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--get', 'variable']);
});

router.get('/studies/:study/variables/:item', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--get', 'variable', req.params.item]);
});

router.post('/studies/:study/variables', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--add', 'variable']);
});

router.put('/studies/:study/variables/:item', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--change', req.params.item, req.param('attr'), req.param('value')]);
});

router.delete('/studies/:study/variables/:item', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--remove', 'variable', req.params.item]);
});


router.get('/studies/:study/responses', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--get', 'response']);
});

router.get('/studies/:study/responses/:item', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--get', 'response', req.params.item]);
});

router.post('/studies/:study/responses', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--add', 'response']);
});

router.put('/studies/:study/responses/:item', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--change', req.params.item, req.param('attr'), req.param('value')]);
});

router.delete('/studies/:study/responses/:item', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--remove', 'response', req.params.item]);
});

module.exports = router;
