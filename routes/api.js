var express = require('express');
var router = express.Router();

router.get('/studies', function(req, res, next) {
  res.send('List studies');
});

router.get('/studies/:study', function(req, res, next) {
  res.send('List study details of ( ' + req.params.study + " )");
});

router.get('/studies/:id/variabes', function(req, res, next) {
  res.send('List study variables');
});

router.get('/studies/:id/variabes/:id', function(req, res, next) {
  res.send('List study variable details');
});

router.post('/studies', function(req, res, next) {
  res.send(new Object("New study created"));
});

router.post('/studies/:study/variables', function(req, res, next) {
  res.send(new Object("New variable created in study ( " + req.params.study + " )"));
});

router.put('/studies/:study', function(req, res, next) {
  res.send(new Object("Update study ( " + req.params.study + " )"));
});

router.put('/studies/:study/variables/:variable', function(req, res, next) {
  res.send(new Object("In study ( " + req.params.study + " ) update variable ( " + req.params.variable + " )"));
});

router.delete('/studies/:study', function(req, res, next) {
  res.send(new Object("Delete study ( " + req.params.study + " )"));
});

router.delete('/studies/:study/variables/:variable', function(req, res, next) {
  res.send(new Object("In study ( " + req.params.study + " ) delete variable ( " + req.params.variable + " )"));
});


module.exports = router;
