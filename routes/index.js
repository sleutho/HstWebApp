var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  console.log(' Cookies: ', req.cookies)
  console.log(' Params : ', req.params)
  console.log(' Body   : ', req.body)
  console.log(' Query  : ', req.query)
  if (Object.keys(req.cookies).indexOf('username') !== -1) {
    res.redirect('/studies')
  } else {
    res.render('index', { title: 'Choose a new username / Enter your username' })
  }
})

router.post('/login', function (req, res, next) {
  if (req.body.username.length) {
    res.cookie('username', req.body.username, { httpOnly: false, secure: false, maxAge: 432000000 })
    res.redirect('/studies')
  } else {
    res.redirect('/')
  }
})

router.get('/logout', function (req, res, next) {
  res.clearCookie('username')
  res.redirect('/')
})

module.exports = router
