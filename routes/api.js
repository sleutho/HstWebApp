var express = require('express');
var studylist = require('../study/studylist')
var exec = require('../study/exec');

var router = express.Router();

router.get('/studies', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    studylist.getStudyList(req.cookies.username, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.get('/studies/:study', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--get', 'study']);
});

router.post('/studies', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    studylist.createStudy(req.cookies.username, function (err, data) {
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


router.post('/studies/:study/specification', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--perturb', 'set', req.param('label')]);
});

router.put('/studies/:study/specification', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--perturb', 'change', req.param('prop'), req.param('value')]);
});

router.get('/studies/:study/specification', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--perturb', 'get']);
});


router.put('/studies/:study/evaluate', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--evaluate']);
});

router.get('/studies/:study/evaluate', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--evaluate', 'get']);
});



router.get('/studies/:study/post', function (req, res, next) {
    var cmd = exec(res);
    cmd.eval(req.params.study, ['--post']);
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
