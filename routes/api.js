var express = require('express')
var studylist = require('../study/studylist')
var exec = require('../study/exec')

var router = express.Router()

var cookieTest = function (req, res, next) {
  console.log(' Cookies: ', req.cookies)
  console.log(' Body   : ', req.param.body)
  console.log(' Query  : ', req.param.query)
  if (Object.keys(req.cookies).indexOf('username') === -1) {
    res.status(401)
    return
  } else if (req.cookies.username.length === 0) {
    res.status(401)
    return
  } else {
    next()
  }
}

router.all('/*', cookieTest)

router.get('/', function (req, res, next) {
  studylist.getStudyList(req.cookies.username, function (err, data) {
    res.status(err ? 400 : 200).json(err !== null ? err : data)
  })
})

router.get('/:study', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--get', 'study'])
})

router.post('/', function (req, res, next) {
  studylist.createStudy(req.cookies.username, function (err, data) {
    res.status(err ? 400 : 200).json(err !== null ? err : data)
  })
})

router.put('/:study', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--change', 'study', req.param('attr'), req.param('value')])
})

router.delete('/:study', function (req, res, next) {
  studylist.deleteStudy(req.params.study, function (err, data) {
    res.status(err ? 400 : 200).json(err !== null ? err : data)
  })
})


router.post('/:study/specification', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--perturb', 'set', req.param('label')])
})

router.put('/:study/specification', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--perturb', 'change', req.param('prop'), req.param('value')])
})

router.get('/:study/specification', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--perturb', 'get'])
})


router.put('/:study/evaluate', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--evaluate'])
})

router.get('/:study/evaluate', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--evaluate', 'get'])
})



router.get('/:study/post', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--post'])
})


router.get('/:study/variables', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--get', 'variable'])
})

router.get('/:study/variables/:item', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--get', 'variable', req.params.item])
})

router.post('/:study/variables', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--add', 'variable'])
})

router.put('/:study/variables/:item', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--change', req.params.item, req.param('attr'), req.param('value')])
})

router.delete('/:study/variables/:item', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--remove', 'variable', req.params.item])
})


router.get('/:study/responses', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--get', 'response'])
})

router.get('/:study/responses/:item', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--get', 'response', req.params.item])
})

router.post('/:study/responses', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--add', 'response'])
})

router.put('/:study/responses/:item', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--change', req.params.item, req.param('attr'), req.param('value')])
})

router.delete('/:study/responses/:item', function (req, res, next) {
  var cmd = exec(res)
  cmd.eval(req.params.study, ['--remove', 'response', req.params.item])
})

module.exports = router
