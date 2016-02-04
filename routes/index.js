var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    if (Object.keys(req.cookies).indexOf('username') != -1)
        return res.redirect('/studies');
    else
        res.render('index', { title: 'Choose a new username / Enter your username' });
});

router.post('/login', function (req, res, next) {
    if (req.param('username').length) {
        res.cookie('username', req.param('username'), { httpOnly: false, secure: false, maxAge: 432000000});
        res.redirect('/studies');
    } else {
        res.redirect('/');
    }
});

router.get('/logout', function (req, res, next) {
    res.clearCookie('username');
    res.redirect('/');
});

module.exports = router;
