var express = require('express');
var studylist = require('../study/studylist')
var cmd = require('../study/cmd');

var router = express.Router();

router.get('/studies', function (req, res, next) {
    studylist.getStudyList(function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.get('/studies/:study', function (req, res, next) {
    cmd.getStudy(req.params.study, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.post('/studies', function (req, res, next) {
    studylist.createStudy(function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.put('/studies/:study', function (req, res, next) {
    cmd.setStudy(req.params.study, req.query.attr, req.query.value, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.delete('/studies/:study', function (req, res, next) {
    studylist.deleteStudy(req.params.study, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.get('/studies/:study/variabes', function (req, res, next) {
    cmd.getVariables(req.params.study, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.get('/studies/:study/variabes/:variable', function (req, res, next) {
    cmd.getVariable(req.params.study, req.params.variable, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.post('/studies/:study/variables', function (req, res, next) {
    cmd.addVariable(req.params.study, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});

router.put('/studies/:study/variables/:variable', function (req, res, next) {
    cmd.setVariable(
        req.params.study, req.params.variable,
        req.query.attr, req.query.value,
        function (err, data) {
            res.status(err ? 400 : 200).json(err ? err : data);
        });
});

router.delete('/studies/:study/variables/:variable', function (req, res, next) {
    cmd.removeVariable(req.params.study, req.params.variable, function (err, data) {
        res.status(err ? 400 : 200).json(err ? err : data);
    });
});


module.exports = router;
